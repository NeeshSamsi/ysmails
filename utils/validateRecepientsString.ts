import parseStringToRecepients from "./parseStringToRecepients"

interface Result {
  isValid: boolean
  error?: {}
}

const validateRecepientsString = (recepientsString: string): Result => {
  const recepients = parseStringToRecepients(recepientsString)

  if (recepients.length === 0) {
    return {
      isValid: false,
      error: {
        message: "No recepients found",
      },
    }
  }

  for (const contact of recepients) {
    // TODO
  }

  return {
    isValid: true,
  }
}

export default validateRecepientsString
