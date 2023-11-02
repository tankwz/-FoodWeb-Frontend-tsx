export default interface apiResponse {
  data?: {
    status?: number;
    isSuccess?: boolean;
    errorMessage?: Array<string>;
    result: {
      [key: string]: string; //a
    };
  };
  error?: any;
}
