import { createResource } from "solid-js";
import ApiCache from "../../utils/apiCache";
import { backend, quizApp } from "../../utils/secrets";
import NotFound from "../../assets/robot-404.png";
import CardImage from "../../assets/20945825.jpg";
import Loading from "../../components/Loading/loading";
import { getErrorMessage } from "../../utils/responses";
import Metadata from "../../components/Metadata/metadata";

const apiCache = new ApiCache("available-quizzes-cache");

const fetchAvailableQuizzes = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backend}/api/v1/quiz/`;

  const request = new Request(url, options);

  try {
    const cachedResponse = await apiCache.getCachedResponse(request);

    if (cachedResponse) return cachedResponse.json();

    const response = await apiCache.fetchWithCache(request);

    const res = await response.json();

    if (response.status >= 400) {
      return {
        status: response.status,
        message: res?.detail ? res?.detail : getErrorMessage(response.status),
      };
    }

    return res;
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

const refreshData = async (refetch) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `${backend}/api/v1/quiz/`;

  const request = new Request(url, options);

  try {
    await apiCache.deleteCacheEntry(request);

    refetch();
  } catch (err) {
    throw new Error("Something went wrong: " + err);
  }
};

const Quiz = () => {
  const [quizData, { refetch }] = createResource(fetchAvailableQuizzes);

  const refetchTableData = async () => {
    refreshData(refetch);
  };

  return (
    <>
      <Metadata title="Quiz" />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Match when={quizData()}>
            <div className="p-4">
              {() => {
                const data = quizData();

                if (data.length > 0) {
                  return (
                    <>
                      <button
                        className="btn btn-sm bg-base-300 w-full mb-4"
                        onClick={refetchTableData}
                      >
                        Refresh Data
                      </button>

                      <h1 className="text-xl font-semibold text-center">
                        Available Quizzes
                      </h1>

                      <div className="p-4 flex flex-col lg:flex-row justify-start items-center">
                        <For each={data}>
                          {(item) => (
                            <a href={`${quizApp}/quizzes/${item?.id}`}>
                              <div className="card bg-base-100 image-full w-full lg:w-96 shadow-xl">
                                <figure>
                                  <img
                                    className="h-1/2"
                                    src={CardImage}
                                    alt="card image"
                                  />
                                </figure>
                                <div className="card-body">
                                  <h2 className="card-title">{item?.title}</h2>
                                  <p>{item?.description}</p>
                                </div>
                              </div>
                            </a>
                          )}
                        </For>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div className="flex justify-center items-center pt-56">
                      <div className="text-center">
                        <p className="text-2xl font-semibold mb-4">
                          No quizzes found
                        </p>
                      </div>
                    </div>
                  );
                }
              }}
            </div>
          </Match>
          <Match when={!quizData()}>
            <div className="flex justify-center items-center pt-20">
              <div className="text-center">
                <img src={NotFound} alt="404" className="w-1/2 m-auto" />
                <p className="text-2xl font-semibold">Could not fetch data</p>
              </div>
            </div>
          </Match>
        </Switch>
      </Suspense>
    </>
  );
};

export default Quiz;
