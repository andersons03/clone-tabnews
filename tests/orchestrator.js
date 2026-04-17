import retry from "async-retry";

async function waitForAllServices() {
  await waitforWebService();

  async function waitforWebService() {
    return retry(fetchStatusPage, { retries: 10, maxTimeout: 1000 });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error();
      }

      // const responseBody = await response.json();
    }
  }
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
