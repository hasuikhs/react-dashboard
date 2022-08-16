async function copyToClipboard(text: string): Promise<boolean> {

  let isCopy: boolean = false;

  try{
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else { // safari
      const textarea: HTMLTextAreaElement = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');

      document.body.removeChild(textarea);
    }
    isCopy = true;
  } catch {
    isCopy = false;
  }

  return isCopy
}

export default copyToClipboard;