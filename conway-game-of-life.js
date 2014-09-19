var gol = function() {

	var context = null,
		cellSize = 10;
		offsets = [-1, 0, 1],
		tickDuration = 500;

	var bigBang = initialWorld => {
		var world = initialWorld;

		drawWorld(initialWorld);
		setInterval(function() {
			world = nextWorld(world);
			drawWorld(world);
		}, tickDuration);
	}

	var nextWorld = world => {
		var newWorld = [];

		world.forEach((col, x) => {
			newWorld.push([]);
			col.forEach((cell, y) => {
				var neighbours = 0,
					isAlive;

				offsets.forEach(h => offsets.forEach(v => {
					if(world[x + h] && (h !== 0 || v !== 0)) world[x + h][y + v] === 1 && neighbours++;
				}));

				isAlive = world[x][y] === 1 && [2, 3].indexOf(neighbours) !== -1 || world[x][y] === 0 && neighbours === 3;
				newWorld[x].push(isAlive ? 1 : 0);
			})
		});

		return newWorld;
	};

	var drawWorld = world => {
		// clear canvas
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		//draw world
		world.forEach((col, x) => col.forEach((cell, y) => cell === 1 && drawCell(x, y))) && console.log(world);
	}

	var drawCell = (x, y) => context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

	var worldFromCells = (cells, visibleWorldWidth, visibleWorldHeight) => {
		var i, j, world = [];

		for(i = 0; i < visibleWorldWidth; i++) {
			world.push([]);
			for(j = 0; j < visibleWorldHeight; j++) {
				world[i].push(cells.some(c => c.x === i && c.y === j) ? 1 : 0);
			}
		}

		return world;
	};

	return {
		init: (canvas, width, height, initialCells) => {

			// set the size of the visible world
			canvas.width = width * cellSize;
			canvas.height = height * cellSize;

			// get context
			context = canvas.getContext('2d');

			bigBang(worldFromCells(initialCells, width, height));
		}
	};

};