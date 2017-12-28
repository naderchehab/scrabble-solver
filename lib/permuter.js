const results = {};

function doPermute(input, output, used, size, level) {
  if (size == level) {
    let word = output.join("");
    results[word] = true;
    return;
  }

  level++;

  for (let i = 0; i < input.length; i++) {
    if (used[i]) {
      continue;
    }

    used[i] = true;
    output.push(input[i]);
    doPermute(input, output, used, size, level);
    used[i] = false;
    output.pop();
  }
}

module.exports = {
  getPermutations: function(input, size) {
    const output = [];
    const used = new Array(input.length);
    doPermute(input, output, used, size, 0);
    return Object.keys(results);
  }
};
