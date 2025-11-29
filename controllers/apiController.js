import axios from "axios";

export const testRequest = async (req, res) => {
  try {
    const { url, method, headers, body } = req.body;

    const response = await axios({
      url,
      method,
      headers,
      data: body,
    });

    res.json({
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
  } catch (error) {
    res.json({
      error: true,
      message: error.message,
    });
  }
};
