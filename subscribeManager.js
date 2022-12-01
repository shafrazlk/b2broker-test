export default class SubscribeManager {
  constructor() {
    this.subscribeCount = 0;
  }

  subscribe(subscriber, type) {
    this.subscribeCount++;

    // setTimeout(() => {
    //   subscriber.send(
    //     JSON.stringify({
    //       type: type,
    //       status: "Subscribed",
    //       updatedAt: Date.now(),
    //     })
    //   );
    // }, 4000);
    subscriber.send(
      JSON.stringify({
        type: type,
        status: "Subscribed",
        updatedAt: Date.now(),
      })
    );
  }

  unsubscribe(subscriber, type) {
    this.subscribeCount > 0 ? this.subscribeCount-- : 0;

    // setTimeout(() => {
    //   subscriber.send(
    //     JSON.stringify({
    //       type: type,
    //       status: "Unsubscribed",
    //       updatedAt: Date.now(),
    //     })
    //   );
    // }, 8000);
    subscriber.send(
      JSON.stringify({
        type: type,
        status: "Unsubscribed",
        updatedAt: Date.now(),
      })
    );
  }

  subscriberCount(subscriber, type) {
    subscriber.send(
      JSON.stringify({
        type: type,
        count: this.subscribeCount,
        updatedAt: Date.now(),
      })
    );
  }
}
