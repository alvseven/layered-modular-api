type ErrorResult = {
	status: "error";
	code: number;
	message: string;
};

type SuccessResult<T> = {
	status: "ok";
	code: number;
	data: T;
};

export type Result<T> = SuccessResult<T> | ErrorResult;

export const success = <T>(data: T, code = 200): SuccessResult<T> => {
	return {
		status: "ok",
		code,
		data,
	} as const;
};

export const error = (message: string, code = 400): ErrorResult => {
	return {
		status: "error",
		code,
		message,
	};
};
