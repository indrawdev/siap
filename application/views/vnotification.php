<html>
<head>
	<title>IDS - Integrated Dealership System</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	<link rel="icon" type="image/ico" href="<?php echo config_item('base_img');?>ids.ico">
	<link rel="stylesheet" type="text/css" href="<?php echo config_item('base_tema');?>">
	<link rel="stylesheet" type="text/css" href="<?php echo config_item('base_css');?>form.css">
	<style type="text/css">
		#instructions ul li {
			list-style-type:disc;
			list-style-position:outside;
			font-size:12px;
			margin:0px 0px 0px 20px;
		}
		/* Icons */
		.ux-notification-icon-information {
			background-image: url('images/icon16_info.png');
		}
		.ux-notification-icon-error {
			background-image: url('images/icon16_error.png');
		}
		/* Using standard theme */
		.ux-notification-window .x-window-body {
			text-align: center;
			padding: 15px 5px 15px 5px;
		}
		/* Custom styling */
		.ux-notification-light .x-window-header {
			background-color: transparent;
		}
		body .ux-notification-light {
			background-image: url('images/fader.png');
		}
		.ux-notification-light .x-window-body {
			text-align: center;
			padding: 15px 5px 20px 5px;
			background-color: transparent;
			border: 0px solid white;
		}
	</style>
	<div class="center" id="loading">
		<img src="<?php echo config_item('base_img');?>loading.gif" alt="Loading"/>
	</div>
	<script type="text/javascript" src="<?php echo config_item('base_ext');?>ext-all.js"></script>
	<script type="text/javascript" src="<?php echo config_item('base_lokal');?>ext-locale-en.js?cb=<?php echo time()?>"></script>
	<script type="text/javascript">
		var gBaseUX = '<?php echo config_item('base_ux');?>';
		var gBaseIMG = '<?php echo config_item('base_img');?>';
		var gBasePanel = '<?php echo config_item('base_panel');?>';
	</script>
	<script type="text/javascript" src="<?php echo config_item('base_js');?>notification.js?cb=<?php echo time()?>"></script>
</head>
</html>