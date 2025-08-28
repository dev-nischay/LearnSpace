import AppError from "../utils/AppError.js";

export const Validate = (schema, source = "body") => {
  return (req, res, next) => {
    let data = req[source];
    console.log(data);
    let parsedData = schema.safeParse(data);
    if (!parsedData.success) {
      let errors = parsedData?.error?.issues.map((e) => e.message);
      console.log(errors);
      return next(new AppError(errors, 400));
    }
    const targetMap = {
      body: "validatedBody",
      params: "validatedParams",
      query: "validatedQuery",
    };

    req[targetMap[source]] = parsedData.data;
    next();
  };
};
