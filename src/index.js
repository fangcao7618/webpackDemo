export default function add(a, b) {
    const i = a.length - 1;
    const j = b.length - 1;

    let carry = 0;
    let ret = "";
    while (i >= 0 || j >= 0) {
        let x = 0;
        let y = 0;
        let sum;
        if (i >= 0) {
            x = a[i] - "0";
            i--;
        }
        if (j >= 0) {
            x = a[j] - "0";
            j--;
        }

        sum = x + y + carry;
    }
}
