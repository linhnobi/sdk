
export class GetDataPage {

    /**
     * Get data page using tag meta
     */
    private dataByTagMeta() {
        const param = 'meta[name^="m-"]';
        const metaList = document.querySelectorAll(param);
        if (metaList.length === 0) {
            return [];
        }
        let results = {};
        metaList.forEach((meta: HTMLMetaElement) => {
            const obj = {};
            const key = meta.name.replace('m-', '');
            const value = meta.content;
            obj[key] = value
            results = {...results, ...obj};
        });
        return results;
    }
}