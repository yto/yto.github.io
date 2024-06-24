// tekitof.js

class Tekitof {
    constructor(container) {
        this.container = container;
    }

    //// filter keyword
    // 各 node において、selector で絞り込んだ innerText に query を含まない場合、その node を display:none にする
    // - container: この子ノード(.children)がフィルタ対象となる
    // - sel: 例:'.item-title, .item-attr, .item-pub-genres'  どこかに存在すればOK、どこにもなければ display:none
    // - query: 例:'合本版' 先頭に'-'をつけるとNOT検索となる
    // - logic: デフォルト:上書き, "AND":重ねがけ(AND), "OR":重ねがけ(OR)
    filter_keyword(sel, query, logic) {
        const container = this.container;
        const res = /^[-](.+)$/.exec(query);
        if (res) query = res[1];
        return Array.from(container.children).map(e => {
            let judge = Array.from(e.querySelectorAll(sel)).map(e => e.textContent.indexOf(query) >= 0 ? 1 : 0).reduce((r, v) => r || v, 0);
            if (res) judge = 1 - judge;
            const current_val = e.style.display === "none" ? 0 : 1;
            const result_val = this.__tkt_filter_logic_ope(judge, current_val, logic);
            return { dom: e, value: result_val }
        }).map(v => this.__tkt_show_hide_elem(v.dom, v.value)).reduce((r, v) => r + v, 0); // show hide, num of visible items
    }
    
    filter_keywords(sel, query, logic) {
        const container = this.container;
        const and_or = (query.indexOf('|') >= 0) ? "or" : "and";
        const sep = (and_or == "or") ? '|' : /(-?"[^"]+"|\S+|[\s　]+)/;
        const qs = query.split(sep).map(s => s.replace(/^[\s　]+|[\s　]+$/g, '')).filter(s => s.length > 0);
        //console.log(qs, and_or);
        return Array.from(container.children).map(e => {
            const match_num = qs.map(q => {
                const res = /^[-](.+)$/.exec(q);
                if (res) q = res[1];
                q = q.replace(/^"(.+)"$/g, "$1");
                let judge = Array.from(e.querySelectorAll(sel)).map(e => e.textContent.indexOf(q) >= 0 ? 1 : 0).reduce((r, v) => r || v, 0);
                if (res) judge = 1 - judge;
                return judge;
            }).reduce((r, v) => r + v, 0);
            let judge = ((match_num == qs.length) || (match_num >= 1 && and_or == "or")) ? 1 : 0;
            //console.log(match_num,judge);
            const current_val = e.style.display === "none" ? 0 : 1;
            const result_val = this.__tkt_filter_logic_ope(judge, current_val, logic);
            return { dom: e, value: result_val }
        }).map(v => this.__tkt_show_hide_elem(v.dom, v.value)).reduce((r, v) => r + v, 0); // show hide, num of visible items
    }

    //// filter attr
    // 各 node の（子ノードも含む）attr の条件によってその node を display:none にする
    // - container: この子ノード(.children)がフィルタ対象となる
    // - pid: 例:'data-price'  属性を指定、その値で判定
    // - cond: 判定関数。表示1,非表示0。 function(v){if (表示_ok(v)) { return 1 } else { return 0 } }
    // - logic: デフォルト:上書き, "AND":重ねがけ(AND), "OR":重ねがけ(OR)
    filter_attr(pid, cond, logic) {
        const container = this.container;
        return Array.from(container.children).map(e => {
            const m = (e.hasAttribute(pid)) ? e : e.querySelector('['+pid+']');
            let value = m ? m.getAttribute(pid) : '';
            const judge = cond(value);
            const current_val = e.style.display === "none" ? 0 : 1;
            const result_val = this.__tkt_filter_logic_ope(judge, current_val, logic);
            return { dom: e, value: result_val }
        }).map(v => this.__tkt_show_hide_elem(v.dom, v.value)).reduce((r, v) => r + v, 0); // show hide, num of visible items
    }

    //// filter reset
    // 表示のリセット（すべて表示）
    filter_reset() {
        const container = this.container;
        return Array.from(container.children).map(e => {e.style.display = ""}).length;
    }

    //// filter reverse
    // 表示のON/OFFを逆転する
    filter_reverse() {
        const container = this.container;
        return Array.from(container.children).map(e => this.__tkt_show_hide_elem(e, (e.style.display == "none" ? 1 : 0))).reduce((r, v) => r + v, 0);
    }

    //// sort by attr
    // - container: この子ノード(.children)がソート対象となる
    // - pid: 例:'data-price'  属性を指定、その値でソート
    // - mode: 'num' or 'str'  数値ソートか文字列ソートか
    // - direction: 1 or -1  デフォルトは 1 で昇順。-1 で降順に
    sort_by_attr(pid, mode, direction) {
        const container = this.container;
        if (!direction) direction = 1;
        Array.from(container.children)
            .map(e => {
                const m = (e.hasAttribute(pid)) ? e : e.querySelector('['+pid+']');
                let value = m ? m.getAttribute(pid) : '';
                if (mode == 'num') value = Number(value);
                return { dom: e, value: value };
            })
            .sort((a,b) => (a.value == b.value) ? 0 : ((a.value < b.value) ? -1 : 1) * direction)
            .forEach(v => container.appendChild(v.dom));
    }

    //// sort by text
    // (since 2022/11/21)
    // - container: この子ノード(.children)がソート対象となる
    // - sel: このセレクタ先の textContent が比較対象となる
    // - mode: 'num' or 'str'  数値ソートか文字列ソートか
    // - direction: 1 or -1  デフォルトは 1 で昇順。-1 で降順に
    sort_by_text(sel, mode, direction) {
        const container = this.container;
        if (!direction) direction = 1;
        Array.from(container.children)
            .map(e => {
                const m = e.querySelector(sel);
                let value = m ? m.textContent : '';
                if (mode == 'num') value = Number(value);
                return { dom: e, value: value };
            })
            .sort((a,b) => (a.value == b.value) ? 0 : ((a.value < b.value) ? -1 : 1) * direction)
            .forEach(v => container.appendChild(v.dom));
    }

    //// 表示されているのをカウント
    count_shown() {
        const container = this.container;
        return Array.from(container.children).map(e => e.style.display == "none" ? 0 : 1).reduce((r, v) => r + v, 0);
    }

    //// 論理演算操作
    // 1. "": 上書き(default)
    // 2. AND: AND重ねがけ
    // 3. OR: OR重ねがけ
    __tkt_filter_logic_ope(input_val, current_val, logic) {
        let result_val = input_val;
        if (logic === 'AND') result_val = input_val * current_val;
        if (logic === 'OR') result_val = input_val || current_val;
        return result_val;
    }

    //// show hide : set style.display "" or "none"
    __tkt_show_hide_elem(elem, value) {
        elem.style.display = (value == 1) ? "" : "none";
        return value;
    }
    
}
