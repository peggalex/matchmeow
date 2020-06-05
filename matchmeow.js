"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var axios_1 = __importDefault(require("axios"));
var port = 2500;
var app = express_1.default();
app.use(body_parser_1.default.json()); // support json encoded bodies
app.use(body_parser_1.default.urlencoded({ extended: true })); // support encoded bodies
app.use(express_1.default.static('static-files'));
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
// ================================================================================
// ================================================================================
// ================================================================================
function arrayRemove(array, element) {
    var index = array.indexOf(element);
    if (index != -1)
        array.splice(index, 1);
}
function alertError(xhr, status, error) {
    alert(error + ": " + xhr.responseText);
}
;
function waitForAjaxCall(url) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            url = url.replace(/[ \t\n]/g, ''); // get rid of empty spaces and newlines
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var response, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, axios_1.default.get(url)];
                            case 1:
                                response = _a.sent();
                                resolve(response.data);
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.log('axios error:', error_1);
                                reject(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
// ================================================================================
// ================================================================================
// ================================================================================
var MyErrors = /** @class */ (function () {
    function MyErrors(msg, statusCode) {
        if (msg === void 0) { msg = ''; }
        this.message = "Error: " + msg;
        this.statusCode = statusCode;
    }
    return MyErrors;
}());
// some user-defined errors
var DatabaseError = /** @class */ (function (_super) {
    __extends(DatabaseError, _super);
    function DatabaseError(msg) {
        return _super.call(this, msg, 500) || this;
    }
    return DatabaseError;
}(MyErrors));
var InputError = /** @class */ (function (_super) {
    __extends(InputError, _super);
    function InputError(msg) {
        return _super.call(this, msg, 400) || this;
    }
    return InputError;
}(MyErrors));
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(msg) {
        return _super.call(this, msg, 404) || this;
    }
    return NotFoundError;
}(MyErrors));
var BadAuthError = /** @class */ (function (_super) {
    __extends(BadAuthError, _super);
    function BadAuthError(msg) {
        return _super.call(this, msg, 401) || this;
    }
    return BadAuthError;
}(MyErrors));
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(msg) {
        return _super.call(this, msg, 403) || this;
    }
    return ForbiddenError;
}(MyErrors));
var ConflictError = /** @class */ (function (_super) {
    __extends(ConflictError, _super);
    function ConflictError(msg) {
        return _super.call(this, msg, 409) || this;
    }
    return ConflictError;
}(MyErrors));
var BadWebSocketError = /** @class */ (function (_super) {
    __extends(BadWebSocketError, _super);
    function BadWebSocketError(msg) {
        return _super.call(this, msg, null) || this;
    }
    return BadWebSocketError;
}(MyErrors));
function handleResponseErrors(e, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (e instanceof MyErrors && e.statusCode != null) {
                res.status(e.statusCode);
            }
            else {
                res.status(500);
            }
            res.send({ error: e.message });
            console.log(e.message);
            return [2 /*return*/];
        });
    });
}
// input sanitisation
var isAlphaNumeric = function (str) { return RegExp("^[0-9a-zA-Z]+$").test(str); };
var isHex = function (str) { return RegExp("^[0-9a-fA-F]+$").test(str); };
var isUrl = function (str) { return RegExp(/^[^ <>\{\}\\(\\);]+$/g).test(str); };
//https://www.urlencoder.io/learn/
// ================================================================================
// ================================================================================
// ================================================================================
app.use('/', express_1.default.static('static_files')); // this directory has files to be returned
var validGenderPref = ['', 'male', 'female'];
function validateGenderPref(gender) {
    if (!validGenderPref.includes(gender)) {
        throw new InputError('invalid gender pref');
    }
}
var humanToDogYears = 7;
var ProfileCreator = /** @class */ (function () {
    function ProfileCreator() {
    }
    ProfileCreator.getProfileObj = function (genderPref) {
        if (genderPref === void 0) { genderPref = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, imageSrc, quote, _b, _c, first, last, _d, city, country, age;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            ProfileCreator.getImageSrc(),
                            ProfileCreator.getQuote()
                        ])];
                    case 1:
                        _a = _e.sent(), imageSrc = _a[0], quote = _a[1];
                        return [4 /*yield*/, waitForAjaxCall("https://randomuser.me/api/?gender=" + genderPref)];
                    case 2:
                        _b = (_e.sent()).results[0], _c = _b.name, first = _c.first, last = _c.last, _d = _b.location, city = _d.city, country = _d.country, age = _b.dob.age;
                        return [2 /*return*/, {
                                name: first,
                                surname: last,
                                location: city + ", " + country,
                                age: Math.round(parseInt(age) / humanToDogYears),
                                imageSrc: imageSrc,
                                quote: quote
                            }];
                }
            });
        });
    };
    ProfileCreator.getImageSrc = function () {
        return __awaiter(this, void 0, void 0, function () {
            var extension, src;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        extension = ['shibes', 'shibes', 'cats', 'cats', 'birds'][Math.floor(Math.random() * 5)];
                        return [4 /*yield*/, waitForAjaxCall("https://shibe.online/api/" + extension)];
                    case 1:
                        src = (_a.sent())[0];
                        return [2 /*return*/, src];
                }
            });
        });
    };
    ProfileCreator.getQuote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var advice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waitForAjaxCall('https://api.adviceslip.com/advice')];
                    case 1:
                        advice = (_a.sent()).slip.advice;
                        return [2 /*return*/, advice];
                }
            });
        });
    };
    return ProfileCreator;
}());
app.get('/getProfile/:g?', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var genderPref, profileObj, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    genderPref = req.params.g;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    profileObj = void 0;
                    if (!genderPref) return [3 /*break*/, 3];
                    validateGenderPref(genderPref);
                    return [4 /*yield*/, ProfileCreator.getProfileObj(genderPref)];
                case 2:
                    profileObj = _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ProfileCreator.getProfileObj()];
                case 4:
                    profileObj = _a.sent();
                    _a.label = 5;
                case 5:
                    res.status(200);
                    res.send(profileObj);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    handleResponseErrors(e_1, res);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
});
