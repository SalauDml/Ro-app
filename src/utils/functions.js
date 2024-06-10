export function naira_formater(number) {
    const parts = number.toString().split('.');
    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return '₦' + integerPart + (parts[1] ? '.' + parts[1] : '');
}