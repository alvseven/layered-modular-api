export const validateCNPJ = (cnpj: string) => {
	const CNPJ_LENGTH = 14;
	const INVALID_CNPJ_REGEX = /^(\d)\1{13}$/;

	if (!cnpj || cnpj.length !== CNPJ_LENGTH || INVALID_CNPJ_REGEX.test(cnpj)) {
		return false;
	}

	const normalizedCnpj = cnpj.replace(/\D/g, "");

	const calculateCheckDigit = (cnpjArray: number[], multipliers: number[]) => {
		const total = cnpjArray.reduce(
			(sum, digit, index) => sum + digit * multipliers[index],
			0,
		);
		const remainder = total % 11;

		return remainder < 2 ? 0 : 11 - remainder;
	};

	const MULTIPLIERS_FIRST = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	const MULTIPLIERS_SECOND = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	const cnpjArray = normalizedCnpj.split("").map(Number);

	const firstCheckDigit = calculateCheckDigit(
		cnpjArray.slice(0, 12),
		MULTIPLIERS_FIRST,
	);
	const secondCheckDigit = calculateCheckDigit(
		cnpjArray.slice(0, 13),
		MULTIPLIERS_SECOND,
	);

	return (
		firstCheckDigit === cnpjArray[12] && secondCheckDigit === cnpjArray[13]
	);
};
