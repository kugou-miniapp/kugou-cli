import { useEffect, useState} from 'react';

const request = async (config) => {
  // 添加签名于params
  let {params = null, data = null} = config;

  return new Promise((resolve, reject) => {
    window.MiniApp && window.MiniApp.request({
      url: config.url,
      method: config.method === "get" ? "GET" : "POST",
      data: data,
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        resolve(res)
      },
      dataType: "json"
    });
  })
};

const useStateRequest = () => {
  const [data, setData] = useState({});
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (filter.url) {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const result = await request(filter)
          setData(result.data);
        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      };

      fetchData();
    }
  }, [filter]);

  const doFetch = (filter) => {
    setFilter(filter);
  };

  return {data, isLoading, isError, doFetch};
};

export default useStateRequest
