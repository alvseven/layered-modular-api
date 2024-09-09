export const validateCPF = (cpf: string) => {
	const CPF_LENGTH = 11;
	const INVALID_CPF_REGEX = /^(\d)\1{10}$/;

	if (!cpf || cpf.length !== CPF_LENGTH || INVALID_CPF_REGEX.test(cpf)) {
		return false;
	}

	const normalizedCpf = cpf.replace(/\D/g, "");

	const calculateCheckDigit = (cpfArray: number[], factor: number) => {
		const total = cpfArray
			.slice(0, factor - 1)
			.reduce((sum, digit, index) => sum + digit * (factor - index), 0);
		const remainder = total % 11;

		return remainder < 2 ? 0 : 11 - remainder;
	};

	const cpfArray = normalizedCpf.split("").map(Number);

	const firstCheckDigit = calculateCheckDigit(cpfArray, 10);
	const secondCheckDigit = calculateCheckDigit(cpfArray, 11);

	return firstCheckDigit === cpfArray[9] && secondCheckDigit === cpfArray[10];
};
