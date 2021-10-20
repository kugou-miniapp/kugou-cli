const axios = require("axios");
axios.defaults.baseURL = "https://mpservice.kugou.com/v1";

axios.interceptors.request.use(
  function(config) {

    config.headers.Referer = 'http://open.kugou.com/'

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(res) {
    if (res.data && res.data.status === 1 && res.data.errcode !== 20018) {
      return res.data.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

async function uploadPackage({
  appid = 1014,
  mp_appid,
  data,
  appkey,
  version,
  sdk_version_id,
  description
} = {}) {
  const hashes = {
    package: '',
    separate_package_list: []
  }

  for (let file of data) {
    const uploadParams = {
      appid,
      mp_appid,
      appkey,
      data: file.data,
      is_separated: file.root !== 'index'
    };

    const {
      info: {
        package: pkg
      }
    } = await axios({
      url: "/op_app_package/upload_v2",
      method: "POST",
      data: uploadParams
    });

    if (uploadParams.is_separated) {
      hashes.separate_package_list.push({ name: file.root, package: pkg })
    } else {
      hashes.package = pkg
    }
  }

  if (hashes.separate_package_list.length === 0) {
    delete hashes.separate_package_list
  }

  const addParams = {
    appid,
    mp_appid,
    appkey,
    description,
    ...hashes
  };

  if (version) {
    addParams.version = version;
  }

  if (sdk_version_id) {
    addParams.sdk_version_id = sdk_version_id;
  }

  const result = await axios({
    url: "/op_app_package/add_v2",
    method: "POST",
    data: addParams
  });

  return result;
}

exports.uploadPackage = uploadPackage;
