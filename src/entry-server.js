import { createApp } from './main';

export default context => {
  // поскольку могут быть асинхронные хуки маршрута или компоненты,
  // мы будем возвращать Promise, чтобы сервер смог дожидаться
  // пока всё не будет готово к рендерингу.
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // устанавливаем маршрут для маршрутизатора серверной части
    router.push(context.url);

    // ожидаем, пока маршрутизатор разрешит возможные асинхронные компоненты и хуки
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // нет подходящих маршрутов, отклоняем с 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute,
            });
          }
        }),
      )
        .then(() => {
          // После разрешения всех preFetch хуков, наше хранилище теперь
          // заполнено состоянием, необходимым для рендеринга приложения.
          // Когда мы присоединяем состояние к контексту, и есть опция `template`
          // используемая для рендерера, состояние будет автоматически
          // сериализовано и внедрено в HTML как `window.__INITIAL_STATE__`.
          context.state = store.state;

          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
