/*!
 * jQuery Modal Module
 * Maintained and supported by Nostalg.io and halfnibble (Josh Wedekind)
 * Version: 1.2.4
 *
 * Code based on jQuery Modal by CreativeDream
 * ===========================================
 * Copyright (c) 2015 CreativeDream
 * Website http://creativedream.net/plugins
 * Version: 1.2.3 (10-04-2015)
 * Requires: jQuery v1.7.1 or later
 */
(function($) {
	"use strict";
	$.fn.modal = function(supplied_parameters) {
		var defaults = {
				type: "default",
				title: null,
				text: null,
				size: "normal",
				buttons: [{
					text: "OK",
					val: true,
					onClick: function(e) {
						return true;
					}
				}],
				center: true,
				autoclose: false,
				callback: null,
				onShow: null,
				animate: true,
				closeClick: true,
				closable: true,
				theme: "default",
				background: null,
				zIndex: 1050,
				buttonText: {
					ok: "OK",
					yes: "Yes",
					cancel: "Cancel"
				},
				template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div class="modal-buttons"></div></div></div>',
				_classes: {
					box: ".modal-box",
					boxInner: ".modal-inner",
					title: ".modal-title",
					content: ".modal-text",
					buttons: ".modal-buttons",
					closebtn: ".modal-close-btn"
				}
			},
			t = $.extend({}, defaults, supplied_parameters),
			r, i = $("<div id='modal-window' />").hide(),
			s = t._classes.box,
			o = i.append(t.template),
			u = {
				init: function() {
					$("#modal-window").remove();
					u._setStyle();
					u._modalShow();
					u._modalConent();
					i.on("click", "a.modal-btn", function(t) {
						u._modalBtn($(this));
					}).on("click", t._classes.closebtn, function(e) {
                        r = false;
						u._modalHide();
					}).click(function(e) {
						if (t.closeClick) {
							if (e.target.id == "modal-window") {
                                r = false;
								u._modalHide();
							}
						}
					});
					$(window).bind("keyup", u._keyUpF).resize(function() {
						var e = t.animate;
						t.animate = false;
						u._position();
						t.animate = e;
					});
				},
				_setStyle: function() {
					i.css({
						position: "fixed",
						width: "100%",
						height: "100%",
						top: "0",
						left: "0",
						"z-index": t.zIndex,
						overflow: "auto"
					});
					i.find(t._classes.box).css({
						position: "absolute"
					});
				},
				_keyUpF: function(e) {
					switch ($.keyCode) {
						case 13:
							if (o.find("input:not(.modal-prompt-input),textarea").is(":focus")) {
								return false;
							}
							u._modalBtn(i.find(t._classes.buttons + " a.modal-btn" + (typeof u.btnForEKey !== "undefined" && i.find(t._classes.buttons + " a.modal-btn:eq(" + u.btnForEKey + ")").size() > 0 ? ":eq(" + u.btnForEKey + ")" : ":last-child")));
							break;
						case 27:
							u._modalHide();
							break;
					}
				},
				_modalShow: function() {
				$("body").css({
						overflow: "hidden",
						width: $("body").innerWidth()
					}).append(o);
				},
				_modalHide: function(n) {
					if (t.closable === false) {
						return false;
					}
					r = typeof r == "undefined" ? false : r;
					var o = function() {
						if (t.callback !== null && typeof(t.callback) == "function" ? t.callback(r, i, u.actions) === false ? false : true : true) {
							i.fadeOut(200, function() {
								$(this).remove();
								$("body").css({
									overflow: "",
									width: ""
								});
							});
							var n = 100 * parseFloat($(s).css("top")) / parseFloat($(s).parent().css("height"));
							$(s).stop(true, true).animate({
								top: n + (t.animate ? 3 : 0) + "%"
							}, "fast");
						}
					};
					if (!n) {
						o();
					} else {
						setTimeout(function() {
							o();
						}, n);
					}
					$(window).unbind("keyup", u._keyUpF);
				},
				_modalConent: function() {
					var n = t._classes.title,
						r = t._classes.content,
						o = t._classes.buttons,
						a = t.buttonText,
						f = ["alert", "confirm", "prompt"],
						l = ["xenon", "atlant", "reseted"];
					if ($.inArray(t.type, f) == -1 && t.type != "default") {
						$(s).addClass("modal-type-" + t.type);
					}
					if (t.size && t.size !== null) {
						$(s).addClass("modal-size-" + t.size);
					} else {
						$(s).addClass("modal-size-normal");
					}
					if (t.theme && t.theme !== null && t.theme != "default") {
						$(s).addClass(($.inArray(t.theme, l) == -1 ? "" : "modal-theme-") + t.theme);
					}
					if (t.background && t.background !== null) {
						i.css("background-color", t.background);
					}
					if (t.title || t.title !== null) {
						$(n).prepend("<h3>" + t.title + "</h3>");
					} else {
						$(n).remove();
					}
					if (t.type == "prompt") {
						t.text = (t.text !== null ? t.text : "") + '<input type="text" name="modal-prompt-input" class="modal-prompt-input" autocomplete="off" autofocus="on" />';
					}
					$(r).html(t.text);
					if (t.buttons || t.buttons !== null) {
						var c = "";
						switch (t.type) {
							case "alert":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.ok + "</a>";
								break;
							case "confirm":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.cancel + '</a><a class="modal-btn ' + (t.buttons[1] && t.buttons[1].addClass ? " " + t.buttons[1].addClass : "btn-light-blue") + '">' + a.yes + "</a>";
								break;
							case "prompt":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.cancel + '</a><a class="modal-btn ' + (t.buttons[1] && t.buttons[1].addClass ? " " + t.buttons[1].addClass : "btn-light-blue") + '">' + a.ok + "</a>";
								break;
							default:
								if (t.buttons.length > 0 && $.isArray(t.buttons)) {
									$.each(t.buttons, function(e, t) {
										var n = t.addClass && typeof t.addClass != "undefined" ? " " + t.addClass : "";
										c += '<a class="modal-btn' + n + '">' + t.text + "</a>";
										if (t.eKey) {
											u.btnForEKey = e;
										}
									});
								} else {
									c += '<a class="modal-btn">' + a.ok + "</a>";
								}
						}
						$(o).html(c);
					} else {
						$(o).remove();
					}
					if (t.type == "prompt") {
						$(".modal-prompt-input").focus();
					}
					if (t.autoclose) {
						var h = t.buttons || t.buttons !== null ? $(r).text().length * 32 : 900;
						u._modalHide(h < 900 ? 900 : h);
					}
					i.fadeIn(200, function(){
						if (t.onShow !== null) {
							t.onShow(u.actions);
						}
                    });
					u._position();
				},
				_position: function() {
					var n, r, i;
					if (t.center) {
						n = {
							top: $(window).height() < $(s).outerHeight() ? 1 : 50,
							left: 50,
							marginTop: $(window).height() < $(s).outerHeight() ? 0 : -$(s).outerHeight() / 2,
							marginLeft: -$(s).outerWidth() / 2
						};
						r = {
							top: n.top - (t.animate ? 3 : 0) + "%",
							left: n.left + "%",
							"margin-top": n.marginTop,
							"margin-left": n.marginLeft
						};
						i = {
							top: n.top + "%"
						};
					} else {
						n = {
							top: $(window).height() < $(s).outerHeight() ? 1 : 10,
							left: 50,
							marginTop: 0,
							marginLeft: -$(s).outerWidth() / 2
						};
						r = {
							top: n.top - (t.animate ? 3 : 0) + "%",
							left: n.left + "%",
							"margin-top": n.marginTop,
							"margin-left": n.marginLeft
						};
						i = {
							top: n.top + "%"
						};
					}
					$(s).css(r).stop(true, true).animate(i, "fast");
				},
				_modalBtn: function(n) {
					var s = false,
						o = t.type,
						a = n.index(),
						f = t.buttons[a];
					if ($.inArray(o, ["alert", "confirm", "prompt"]) > -1) {
						r = s = a == 1 ? true : false;
						if (o == "prompt") {
							r = s = s && i.find("input.modal-prompt-input").size() > 0 !== 0 ? i.find("input.modal-prompt-input").val() : false;
						}
						u._modalHide();
					} else {
						if (n.hasClass("btn-disabled")) {
							return false;
						}
						r = s = f && f.val ? f.val : true;
						if (!f.onClick || f.onClick($.extend({
								val: s,
								bObj: n,
								bOpts: f,
							}, u.actions))) {
							u._modalHide();
						}
					}
					r = s;
				},
				actions: {
					html: i,
					close: function() {
						u._modalHide();
					},
					getModal: function() {
						return i;
					},
					getBox: function() {
						return i.find(t._classes.box);
					},
					getInner: function() {
						return i.find(t._classes.boxInner);
					},
					getTitle: function() {
						return i.find(t._classes.title);
					},
					getContet: function() {
						return i.find(t._classes.content);
					},
					getButtons: function() {
						return i.find(t._classes.buttons).find("a");
					},
					setTitle: function(e) {
						i.find(t._classes.title + " h3").html(e);
						return i.find(t._classes.title + " h3").size() > 0;
					},
					setContent: function(e) {
						i.find(t._classes.content).html(e);
						return i.find(t._classes.content).size() > 0;
					}
				}
			};
		u.init();
		return u.actions;
	};
}(jQuery));