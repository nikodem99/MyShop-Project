function Calculator(form, summary) {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60,
        },
        accounting: 35,
        terminal: 5,
    };

    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };

    this.summary = {
        list: summary.querySelector("ul"),
        items: summary.querySelector("ul").children,
        total: {
            container: summary.querySelector("#total-price"),
            price: summary.querySelector(".total__price")
        }
    };

Calculator.prototype.inputEvent = function (e) {
    const id = e.currentTarget.id;
    const value = e.currnetTarget.value;

    const singlePrices = this.prices[id];
    const totalPrices = value * singlePrices;
};

Calculator.prototype.updateSummary = function (id, calc, total, callback) {
    const summary = this.summary.list.querySelector("[data-id]" + id + "]");
    const summaryCalc = this.summary.querySelect(".item__calc");
    const summaryTotal = this.summary.querySelector(".item__price")

    summary.classList.add("open");


    if(summaryCalc !== null) {
        summaryCalc.innerText = calc;
    }
    summaryTotal.innerText = "$" + total;

    if(typeof callback === "function") {
        callback(summaryCalc, summaryTotal);
    }

    this.updateSummary(id, value + "* $" + singlePrice, totalPrice, function (item, calc, total) {
        if(value < 0) {
            calc.innerHTML = null;
            total.innerText = "Value should be greater than 0"
        }

        if(value.length === 0) {
            item.classList.remove("open");
        }
    });
}

Calculator.prototype.selectEvent = function (e) {
    this.form.package.classList.toogle("open");

    const value = typeof e.target.dataset.value !== "undefined" ? e.target.dataset.value : "";
    const text = typeof e.target.dataset.value !== "undefined" ? e.target.innerText : "Choose package";

    if (value.length > 0) {
        this.form.package.dataset.value = value;
        this.form.package.querySelector(".select__input").innerText = text;

        this.updateSummary("package", text, this.prices.package[value])
    }
}

Calculator.prototype.checkboxEvent = function (e) {
    const checkBox = e.currentTarget;
    const id = checkBox.id;
    const checked = e.currentTarget.checked;

    this.updateSummary(id, undefined, this.prices[id], function(item) {
        if(!checked) {
            item.classList.remove("open")
        }
    });
}

Calculator.prototype.addEvents = function () {

    this.form.products.addEventListener("change", this.inputEvent.bind(this));
    this.form.products.addEventListener("keyup", this.inputEvent.bind(this));
    this.form.products.addEventListener("change", this.inputEvent.bind(this));
    this.form.products.addEventListener("keyup", this.inputEvent.bind(this));

    this.form.package.addEventListener("click", this.selectEvent.bind(this));

    this.form.accounting.addEventListener("change", this.checkboxEvent.bind(this));
    this.form.terminal.addEventListener("change", this.checkboxEvent.bind(this));
};

Calculator.prototype.updateTotal = function () {
    const show = this.summary.list.querySelectorAll(".open").length > 0;

    if (show) {
    const productSum = this.form.products.value < 0 ? 0 : this.form.products.value * this.prices.products;
    const ordersSum = this.form.orders.value < 0 ? 0 : this.form.orders.value * this.prices.orders;
    const packagePrice = this.form.package.dataset.value.length === 0 ? 0 : this.prices.package[this.form.package.dataset.value];
    const accounting = this.form.accounting.checked ? this.prices.accounting : 0;
    const terminal = this.form.terminal.checked ? this.prices.terminal : 0;

    this.summary.total.price.innerText = "$" + (productSum + ordersSum + packagePrice + accounting + terminal);

    this.summary.total.container.classList.add("open");
    } else {
        this.summary.total.container.classList.remove("open");
    }
};
}