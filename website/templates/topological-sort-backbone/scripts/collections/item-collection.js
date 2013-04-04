app.Collections.ItemCollection = Backbone.Collection.extend({
	model: app.Models.ItemModel,

	/**
	 * Takes the items in the collection and sort them 
	 * in an order where each item required is before
	 * the items that require it.
	 * @return an ordered array of Item or an error message
	 */
	topologicalSort: function() {
		var vertices = {}, 		// Symbol table of vertices. Key: their name
			order = [], 		// Stack of reverse post-order vertices
			error = null,
			result = null,
			that = this; 		// Stores a cycle error if it detects one

		// Add one vertex per element in the symbol table
		this.models.forEach(function(element) {
			vertices[element.id] = {
				adj: [], 		// Stores adjacent vertices names
				marked: false, 	// Stores the vertex has been visited by dfs
				onStack: false 	// To detect cycle
			};
		});

		// Add edges between vertices by adding dependent vertices in adjacent list of each vertex
		this.models.forEach(function(element) {
			var require = element.get('require');
			for (var id in require) {
				// If required, add the vertex to the adjacent list of the required vertex
				require[id] && vertices[id].adj.push(element.id);
			}
		});

		/**
		 * Depth First Search from the source
		 * @param source source vertex
		 * @private
		 */
		function dfs(source) {
			// Mark the source vertex
			vertices[source].marked = true;

			// Set its onStack to true (to detect cycle)
			vertices[source].onStack = true;

			// For each vertices adjacent to it
			_.each(vertices[source].adj, function(v) {
				// Short circuit if cycle error found
				if (error) { return; }

				// If adjacent vertex is not marked
				if (!vertices[v].marked) {
					// Recursively run dfs on it
					dfs(v);
				// Else if it's already onStack
				} else if (vertices[v].onStack) {
					// A cycle is found so, set an error
					error = [v, source];
				}
			});

			// Reset source vertex's onStack to false
			vertices[source].onStack = false;

			// Add it to the order stack
			order.unshift(source);
		}

		// Mark all vertices
		this.models.forEach(function(element) {
			// Short circuit if cycle found
			if (error) { return; }
			
			// If this vertex has not been marked by precedent dfs calls, run dfs from it
			vertices[element.id].marked || dfs(element.id);
		});

		// Map each id with its corresponding Model
		result = _.map(order, function(id) {
			return that.get(id);
		});

		if (error) {
			// Map each id with its corresponding Model
			var errorItems = _.map(error, function(id) {
				return that.get(id);
			});

			error = { item: errorItems[0], dependency: errorItems[1] };
		}

		return {error: error, order: result};
	}
});