// Default value for days not in this month.
const emptyDate = {
	blank: true,
};

/**
 * Get days in the given month in a 2-dimensional array of [week][day].
 *
 * @param {number} year
 * @param {number} month
 */
export function getRows( year, month ) {
	const daysInWeek = 7;
	const firstOffset = new Date( year, month, 1 ).getDay(); // Get day of the week.
	const monthLength = new Date( year, month + 1, 0 ).getDate(); // 0 gets the last day of the next month.
	const days = [];

	for ( let i = 0; i < firstOffset; i++ ) {
		days.push( emptyDate );
	}
	for ( let i = 1; i <= monthLength; i++ ) {
		days.push( {
			month,
			year,
			day: i,
		} );
	}

	const rows = [];
	for ( let i = 0; i < Math.ceil( days.length / daysInWeek ); i++ ) {
		const start = i * daysInWeek;
		let row = days.slice( start, start + daysInWeek );
		if ( row.length !== daysInWeek ) {
			row = [
				...row,
				...Array( daysInWeek - row.length ).fill( emptyDate ),
			];
		}
		rows.push( row );
	}

	return rows;
}
