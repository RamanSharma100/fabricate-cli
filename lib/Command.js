var Command = /** @class */ (function () {
    function Command(name, description, alias, args, options) {
        if (args === void 0) { args = []; }
        if (options === void 0) { options = []; }
        this.name = name;
        this.description = description;
        this.alias = alias;
        this.args = args;
        this.options = options;
    }
    return Command;
}());
export { Command };
