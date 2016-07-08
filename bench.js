var Benchmark = require("benchmark")
var Enzyme = require(".")
var React = require("react")

var Component = React.createClass({
  render() {
    return React.createElement("section", null, React.createElement("h1",  null), React.createElement("div", null, React.createElement("p", null, "The daily random number is: ", React.createElement("span", { className: "random" }, Math.random()))))
  }
})

var wrapper = Enzyme.shallow(React.createElement(Component, null))

function update(wrapper) {
  wrapper.node = wrapper.renderer.getRenderOutput()
  wrapper.nodes = [wrapper.node]
}

console.log()
console.log(wrapper.text())
wrapper.instance().setState({hello: 123})
console.log(wrapper.text()) // <- Should update with the new changes
console.log()

new Benchmark.Suite()
  .add(".find('span')", function () {
    wrapper.find("span")
  })
  .add(".find('span') with update", function () {
    update(wrapper)
    wrapper.find("span")
  })
  .on("cycle", function (event) {
    console.log(String(event.target))
  })
  .run({ async: true })
