module.exports = {
  handleAPIResponse: (res, status_code, data, sys_err = null) => {
    const res_data = { success: Boolean(status_code === 200), status_code };
    if (data) res_data.data = data;
    if (status_code >= 400) console.log({ ...res_data, sys_err });
    return res.status(status_code).json(res_data);
  },
};
