
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

    /**
     * Return domain of website
     */
    getDomain(): string {
        const url = window.document.URL;
        let domain;
        const regex = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm;;
        let m;

        while ((m = regex.exec(url)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            domain = m[1];
        }

        return domain;
    }
}