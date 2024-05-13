export function displayErrorMessages(messages: string[], element: HTMLElement): void {
  element.querySelectorAll('.invalid-feedback').forEach((errorMessage) => {
    errorMessage.remove();
  });

  messages.forEach((message) => {
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('invalid-feedback');
    errorMessage.innerText = message;
    element.appendChild(errorMessage);
  });
}
