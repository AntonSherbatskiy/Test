var _a, _b, _c;
var Task = /** @class */ (function () {
    function Task(text, completed) {
        this._text = text;
        if (completed) {
            this._completed = true;
        }
        else {
            this._completed = false;
        }
    }
    Object.defineProperty(Task.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            this._text = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "completed", {
        get: function () {
            return this._completed;
        },
        set: function (value) {
            this._completed = value;
        },
        enumerable: false,
        configurable: true
    });
    return Task;
}());
var TaskView = /** @class */ (function () {
    function TaskView(task) {
        this.task = task;
        this.DOMElement = this._createDOM();
    }
    TaskView.prototype.renderIn = function (toRender) {
        toRender.append(this.DOMElement);
    };
    TaskView.prototype._createDOM = function () {
        var divTask = document.createElement('div');
        divTask.classList.add("task");
        var indicator = this.createIndicator(this.task.completed);
        var textSpan = document.createElement('span');
        indicator.classList.add('indicator');
        textSpan.textContent = this.task.text;
        divTask.append(textSpan);
        if (this.task.completed) {
            indicator.classList.add('completed');
        }
        else {
            indicator.classList.add('not-completed');
        }
        divTask.append(indicator);
        return divTask;
    };
    TaskView.prototype.toggleStatus = function () {
        if (this.task.completed === true) {
            this.task.completed = false;
            this.DOMElement.removeChild(this.DOMElement.querySelector('.indicator'));
            this.DOMElement.append(this.createIndicator(false));
        }
        else {
            this.task.completed = true;
            this.DOMElement.removeChild(this.DOMElement.querySelector('.indicator'));
            this.DOMElement.append(this.createIndicator(true));
        }
    };
    TaskView.prototype.createIndicator = function (completed) {
        var _this = this;
        var indicator = document.createElement('div');
        indicator.addEventListener("click", function () {
            _this.toggleStatus();
        });
        indicator.classList.add('indicator');
        if (completed) {
            indicator.classList.add('completed');
        }
        else {
            indicator.classList.add('not-completed');
        }
        return indicator;
    };
    return TaskView;
}());
var ListView = /** @class */ (function () {
    function ListView(dataService, DOMElement) {
        this.DOMElement = DOMElement;
        this.dataService = dataService;
    }
    ListView.prototype.render = function (promise) {
        var _this = this;
        var DOMTasks = [];
        this.DOMElement.innerHTML = '';
        promise.then(function (data) {
            console.log("dede");
            console.log(data);
            data.forEach(function (el) { return DOMTasks.push(new TaskView(el)); });
            DOMTasks.forEach(function (el) { return el.renderIn(_this.DOMElement); });
        });
    };
    return ListView;
}());
var DataService = /** @class */ (function () {
    function DataService() {
    }
    Object.defineProperty(DataService.prototype, "allTasks", {
        get: function () {
            var _this = this;
            return fetch(DataService.url).then(function (data) { return data.json(); }).then(function (data) { return _this.mapped(data); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataService.prototype, "completedTasks", {
        get: function () {
            var _this = this;
            return fetch("".concat(DataService.url, "?completed=true")).then(function (data) { return data.json(); }).then(function (data) { return _this.mapped(data); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataService.prototype, "notCompletedTasks", {
        get: function () {
            var _this = this;
            return fetch("".concat(DataService.url, "?completed=false")).then(function (data) { return data.json(); }).then(function (data) { return _this.mapped(data); });
        },
        enumerable: false,
        configurable: true
    });
    DataService.prototype.mapped = function (tasks) {
        return tasks.map(function (el) { return new Task(el.title, el.completed); });
    };
    DataService.url = 'https://jsonplaceholder.typicode.com/todos';
    return DataService;
}());
var dataService = new DataService();
var listView = new ListView(dataService, document.querySelector('.tasks-container'));
(_a = document.querySelector('#all-tasks')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    listView.render(dataService.allTasks);
});
(_b = document.querySelector("#comp-tasks")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    listView.render(dataService.completedTasks);
});
(_c = document.querySelector("#not-comp-tasks")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    listView.render(dataService.notCompletedTasks);
});
//# sourceMappingURL=main.js.map