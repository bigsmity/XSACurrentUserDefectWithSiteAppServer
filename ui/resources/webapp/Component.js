sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"CurrentUserDefectWithSiteAppServer_ui/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("CurrentUserDefectWithSiteAppServer_ui.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var oModel = new sap.ui.model.odata.v2.ODataModel({
				serviceUrl: "/CurrentUserDefectWithSiteAppServer_js_dest/xsodata/user.xsodata",
				disableHeadRequestForToken: true
			});

			oModel.read("/USER_INFO", {
				success: function (obj1, obj2) {
					console.log(obj1);
					console.log(obj2);
				},
				error: function (error) {
					console.log(error);
				}
			});

		}
	});
});