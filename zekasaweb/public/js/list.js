erpnext.ProductList = class {
	/* Options:
		- items: Items
		- settings: E Commerce Settings
		- products_section: Products Wrapper
		- preference: If preference is not list view, render but hide
	*/
	constructor(options) {
		Object.assign(this, options);

		if (this.preference !== "List View") {
			this.products_section.addClass("hidden");
		}

		this.products_section.empty();
		this.make();
	}

	make() {
		let me = this;
		let html = `<br><br>`;

		this.items.forEach(item => {
			let title = item.web_item_name || item.item_name || item.item_code || "";
			title =  title.length > 200 ? title.substr(0, 200) + "..." : title;

			html += `<div class='col-lg-6 col-sm-12 w-100 mb-4 '>
						<div class="list-row d-flex row shadow mx-1 min-height-280 vertical-product">`;
							html += me.get_image_html(item, title, me.settings);
							html += me.get_row_body_html(item, title, me.settings);
							html += `
						</div>
					</div>`;
		});

		let $product_wrapper = this.products_section;
		$product_wrapper.append(html);
	}

	get_image_html(item, title, settings) {
		let image = item.website_image || item.image;
		let wishlist_enabled = !item.has_variants && settings.enable_wishlist;
		let image_html = ``;

		if (image) {
			image_html += `
				<div class="col-5 border text-center rounded list-image">
					<a class="product-link product-list-link" href="/${ item.route || '#' }">
						<img itemprop="image" class="website-image h-100 w-100" alt="${ title }"
							src="${ image }">
					</a>
					${ wishlist_enabled ? this.get_wishlist_icon(item): '' }
				</div>
			`;
		} else {
			image_html += `
				<div class="col-5 border text-center rounded list-image">
					<a class="product-link product-list-link" href="/${ item.route || '#' }"
						style="text-decoration: none">
						<div class="card-img-top no-image-list">
							${ frappe.get_abbr(title) }
						</div>
					</a>
					${ wishlist_enabled ? this.get_wishlist_icon(item): '' }
				</div>
			`;
		}

		return image_html;
	}

	get_row_body_html(item, title, settings) {
		let body_html = `<div class='col-7 text-left'>`;
		body_html += this.get_title_html(item, title, settings);
		body_html += this.get_item_details(item, settings);
		body_html += `</div>`;
		return body_html;
	}

	get_title_html(item, title, settings) {
		let title_html = `<div class="justify-content-between" style="display: flex; ">`;
		title_html += `
			<div  style="margin-right: -15px; display: flex; align-items: center;">
				<h5 class="darkblue-text"><a class="" href="/${ item.route || '#' }"
					style="color: var(--dark-blue); ">
					${ title }
				</a>
				</h5>
			</div>
		`;

		if (settings.enabled) {
			title_html += `<div class=" cart-action-container ${item.in_cart ? 'd-flex' : ''}" style="margin-left: 0.5rem;">`;
			title_html += this.get_primary_button(item, settings);
			title_html += `</div>`;
		}
		title_html += `</div>`;

		return title_html;
	}

	get_item_details(item, settings) {
		let details = `
			<div class="space-between-column">
				<div class="product-code-contaier">
					<p class="product-code">
						<span class="darkblue-text" style="font-weight: 500;">Item Group</span> : ${ item.item_group } <br/><span class="darkblue-text" style="font-weight: 500;">Item Code</span> : ${ item.item_code }
					</p>
				</div>
				<div class="mt-2" style="color: var(--gray-600) !important; font-size: 40px;">
					${ item.short_description || '' }
				</div>
				<div class="product-price">
					${ item.formatted_price || '' }
				</div>
				<div class="d-flex justify-content-start" style="${ item.has_variants ? 'display: none !important;':''}">
					<a href="/cart" class="zekasa-button my-1 ${ item.in_cart ? '' : 'hidden' }">
						<div id="${ item.name }" class=" btn-add-to-cart-list
							go-to-cart mb-0 mt-0
							${ item.in_cart ? '' : 'hidden' }"
							data-item-code="${ item.item_code }"
							style=" min-width: 135px;">
							<span class="darkblue-text">${ settings.enable_checkout ? __('Go to Cart') :  __('Go to Quote') }</span>
							<svg width="13px" height="10px" viewBox="0 0 13 10">
								<path d="M1,5 L11,5"></path>
								<polyline points="8 1 12 5 8 9"></polyline>
                        	</svg>
						</div>
					</a>
				</div>
				
				<div class="d-flex justify-content-start  ">
					<div id="${ item.name }" class="zekasa-button btn-add-to-cart-list
						${ item.in_cart ? 'hidden' : '' }"
						data-item-code="${ item.item_code }"
						style="margin-top: 0px !important; max-height: 30px; float: right; min-width: 135px;">
							<span class="darkblue-text">${ settings.enable_checkout ? __('Add to Cart') :  __('Add to Quote') }</span>
							<svg width="13px" height="10px" viewBox="0 0 13 10">
								<path d="M1,5 L11,5"></path>
								<polyline points="8 1 12 5 8 9"></polyline>
							</svg>
					</div>
				</div>
				
			</div>
		`;

		if (item.formatted_mrp) {
			details += `
				<small class="striked-price">
					<s>${ item.formatted_mrp ? item.formatted_mrp.replace(/ +/g, "") : "" }</s>
				</small>
				<small class="ml-1 product-info-green">
					${ item.discount } OFF
				</small>
			`;
		}

		details += this.get_stock_availability(item, settings);
		details += `</div>`;

		return details;
	}

	get_stock_availability(item, settings) {
		if (settings.show_stock_availability && !item.has_variants) {
			if (item.on_backorder) {
				return `
					<br>
					<span class="out-of-stock mt-2" style="color: var(--primary-color)">
						${ __("Available on backorder") }
					</span>
				`;
			} else if (!item.in_stock) {
				return `
					<br>
					<span class="out-of-stock mt-2">${ __("Out of stock") }</span>
				`;
			}
		}
		return ``;
	}

	get_wishlist_icon(item) {
		let icon_class = item.wished ? "wished" : "not-wished";

		return `
			<div class="like-action-list ${ item.wished ? "like-action-wished" : ''}"
				data-item-code="${ item.item_code }">
				<svg class="icon sm">
					<use class="${ icon_class } wish-icon" href="#icon-heart"></use>
				</svg>
			</div>
		`;
	}

	get_primary_button(item, settings) {
		if (item.has_variants) {
			return `
				<a href="/${ item.route || '#' }">
					<div class="btn btn-sm btn-explore-variants btn mb-0 mt-0">
						${ __('Explore') }
					</div>
				</a>
			`;
		} else if (settings.enabled && (settings.allow_items_not_in_stock || item.in_stock)) {
			return `
				<div class="cart-indicator list-indicator ${item.in_cart ? '' : 'hidden'}">
					1
				</div>
			`;
		} else {
			return ``;
		}
	}

};