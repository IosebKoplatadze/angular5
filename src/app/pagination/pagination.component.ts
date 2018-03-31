import {
	Component,
	Input,
	Output,
	EventEmitter
} from '@angular/core';
import { OnChanges } from '@angular/core';
import { Pagination } from '../_models/pagination';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
	@Input('total-items') totalItems;
	@Output('page-changed') pageChanged = new EventEmitter();

	pagination: Pagination = new Pagination();

	ngOnChanges() {
		this.pagination.currentPage = 1;
		this.pagination.itemsPerPage = 10;
		this.pagination.totalItems = this.totalItems;

		var pagesCount = Math.ceil(this.pagination.totalItems / this.pagination.itemsPerPage);
		this.pagination.pages = [];
		for (var i = 1; i <= pagesCount; i++)
			this.pagination.pages.push(i);
	}

	changePage(page) {
		this.pagination.currentPage = page;
		this.pageChanged.emit(this.pagination);
	}

	previous() {
		if (this.pagination.currentPage == 1)
			return;

		this.pagination.currentPage--;
		this.pageChanged.emit(this.pagination);
	}

	next() {
		if (this.pagination.currentPage == this.pagination.pages.length)
			return;

		this.pagination.currentPage++;
		this.pageChanged.emit(this.pagination);
	}
}