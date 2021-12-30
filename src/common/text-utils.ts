export default class TextUtils {
    /**
     * Envelops value into html bold tag
     * @param value
     */
    public static toBold(value: string) : string {
        return `<b>${ value }</b>`;
    }

    /**
     * Envelops value into html italic tag
     */
    public static toItalic(value: string) : string {
        return `<i>${ value }</i>`
    }

    /**
     * Envelops value into html underline tag
     */
    public static toUnderline(value: string) : string{
        return `<u>${ value }</u>`
    }

    /**
     * Creates an html link
     */
    public static toLink(value: string, link: string) : string {
        return `<a href="${ link }">${ TextUtils.toBold(value) }</a>`;
    }
}