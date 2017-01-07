import wu from 'wu';

import {Observable} from 'rxjs/Observable';

function hybrid(ld, rx, wuFn) {
	return function (...args) {
		if (this instanceof Observable) {
			return this::rx(...args);
		} else if (typeof this.next === 'function') {
			return wu(this)[wuFn](...args);
		} else {
			return this::ld(...args);
		}
	};
}

import ld_filter             from 'lodash-bound/filter';
import {filter as rx_filter} from 'rxjs/operator/filter';
export const filter = hybrid(ld_filter, rx_filter, 'filter');

import ld_map          from 'lodash-bound/map';
import {map as rx_map} from 'rxjs/operator/map';
export const map = hybrid(ld_map, rx_map, 'map');

