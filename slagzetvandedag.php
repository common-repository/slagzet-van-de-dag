<?php
/*
Plugin Name: Slagzet van de dag
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: Dagenlijks een nieuw slagzet op je site.
Version: 1.0.0
Author: Maurits Meijer
Author URI: http://slagzet.com
*/

error_reporting(E_ALL & ~E_STRICT);
add_action("widgets_init", array('SVD', 'register'));
define( 'SLAGZETVANDEDAG_PATH', plugin_dir_url(__FILE__) );

class SVD {
	function control(){
	}
	
	function widget($args){
		wp_register_script('board',SLAGZETVANDEDAG_PATH . 'board.js', array('jquery'));
		wp_enqueue_script('board');
		wp_register_script('boardViewMini',SLAGZETVANDEDAG_PATH . 'boardViewMini.js', array('board'));
		wp_enqueue_script('boardViewMini');
		wp_register_style('SVDStyle', SLAGZETVANDEDAG_PATH . 'style.css');
		wp_enqueue_style('SVDStyle');
		$json = file_get_contents("http://slagzet.com/api/slagzetvandedag");

		echo $args['before_widget'];
		echo $args['before_title'] . 'Slagzet van de dag' . $args['after_title'];
		echo '<div id="SVDcontainer">';
		echo '<p id="SVDname"></p>';
		echo '<a id="SVDoriginal" href="http://slagzet.com" target="slagzet.com" title="slagzet.com"><div id="SVDboard" ></div></a>';
		echo '<p id="SVDass"></p>';
		echo '<span id="SVDjson" class="SVDhidden">' .$json .'</span>';
		echo '<span id="SVDurl" class="SVDhidden">' .SLAGZETVANDEDAG_PATH  .'</span>';
		echo '<div id="SVDplayback" >';
		echo '<img src="'.SLAGZETVANDEDAG_PATH.'btnbackdis.png" alt="vorige" id="SVDimgPrev" >';
		echo '<img src="'.SLAGZETVANDEDAG_PATH.'btnforward.png" alt="volgende" id="SVDimgNext" class="SVDclickable">';
		echo '</div>';
		echo '</div>';
		echo $args['after_widget'];
	}
	
	function register(){
		register_sidebar_widget('Slagzet van de dag', array('SVD', 'widget'));
		register_widget_control('Slagzet van de dag', array('SVD', 'control'));
	}
}
?>