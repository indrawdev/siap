<table border="0" align="center" width="100%">
	<thead>
		<tr>
			<td width="5%"></td>
			<td width="40%" align="left">LAPORAN HARIAN</td>
			<td width="10%"></td>
			<td width="40%" align="right"></td>
			<td width="5%"></td>
		</tr>
	</thead>
	<tbody>
		<br>
		<tr>
			<td width="100%">
				<table border="1" width="100%">
					<thead>
						<tr>
							<td width="15%">NAMA</td>
							<td width="2%">1</td>
							<td width="2%">2</td>
							<td width="2%">3</td>
							<td width="2%">4</td>
							<td width="2%">5</td>
							<td width="2%">6</td>
							<td width="2%">7</td>
							<td width="2%">8</td>
							<td width="2%">9</td>
							<td width="2%">10</td>
							<td width="2%">11</td>
							<td width="2%">12</td>
							<td width="2%">13</td>
							<td width="2%">14</td>
							<td width="2%">15</td>
							<td width="2%">16</td>
							<td width="2%">17</td>
							<td width="2%">18</td>
							<td width="2%">19</td>
							<td width="2%">20</td>
							<td width="2%">21</td>
							<td width="2%">22</td>
							<td width="2%">23</td>
							<td width="2%">24</td>
							<td width="2%">25</td>
							<td width="2%">26</td>
							<td width="2%">27</td>
							<td width="2%">28</td>
							<td width="2%">29</td>
							<td width="2%">30</td>
							<td width="2%">31</td>
						</tr>
					</thead>
					<tbody>
						<?php foreach ($report as $key) : ?>
						<tr>
							<td width="15%"><?php echo $key->fs_nama; ?></td>
							<td width="2%"><?php echo $key->fn_1; ?></td>
							<td width="2%"><?php echo $key->fn_2; ?></td>
							<td width="2%"><?php echo $key->fn_3; ?></td>
							<td width="2%"><?php echo $key->fn_4; ?></td>
							<td width="2%"><?php echo $key->fn_5; ?></td>
							<td width="2%"><?php echo $key->fn_6; ?></td>
							<td width="2%"><?php echo $key->fn_7; ?></td>
							<td width="2%"><?php echo $key->fn_8; ?></td>
							<td width="2%"><?php echo $key->fn_9; ?></td>
							<td width="2%"><?php echo $key->fn_10; ?></td>
							<td width="2%"><?php echo $key->fn_11; ?></td>
							<td width="2%"><?php echo $key->fn_12; ?></td>
							<td width="2%"><?php echo $key->fn_13; ?></td>
							<td width="2%"><?php echo $key->fn_14; ?></td>
							<td width="2%"><?php echo $key->fn_15; ?></td>
							<td width="2%"><?php echo $key->fn_16; ?></td>
							<td width="2%"><?php echo $key->fn_17; ?></td>
							<td width="2%"><?php echo $key->fn_18; ?></td>
							<td width="2%"><?php echo $key->fn_19; ?></td>
							<td width="2%"><?php echo $key->fn_20; ?></td>
							<td width="2%"><?php echo $key->fn_21; ?></td>
							<td width="2%"><?php echo $key->fn_22; ?></td>
							<td width="2%"><?php echo $key->fn_23; ?></td>
							<td width="2%"><?php echo $key->fn_24; ?></td>
							<td width="2%"><?php echo $key->fn_25; ?></td>
							<td width="2%"><?php echo $key->fn_26; ?></td>
							<td width="2%"><?php echo $key->fn_27; ?></td>
							<td width="2%"><?php echo $key->fn_28; ?></td>
							<td width="2%"><?php echo $key->fn_29; ?></td>
							<td width="2%"><?php echo $key->fn_30; ?></td>
							<td width="2%"><?php echo $key->fn_31; ?></td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</td>
		</tr>
	</tbody>
</table>