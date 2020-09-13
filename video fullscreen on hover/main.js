"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// bad animation handling. timing is 2x too long

var Slideshow = function (_React$Component) {
  _inherits(Slideshow, _React$Component);

  function Slideshow() {
    _classCallCheck(this, Slideshow);

    var _this = _possibleConstructorReturn(this, (Slideshow.__proto__ || Object.getPrototypeOf(Slideshow)).call(this));

    _this.state = {
      loaded: false,
      animating: false,
      animationDirection: "",
      animationDuration: 300,
      currentSlide: 0,
      slides: [{
        title: "Raika",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant1.png",
        description: "An incredible plant to beautify your living room.",
        details: {
          temperature: "70 degrees F day 65 degrees F night",
          water: "Summer: 2 litres Winter: 1 litre",
          nutrition: "Garden loam, perlite, peat moss"
        }
      }, {
        title: "Another Plant",
        imageUrl: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/36124/plant2.png",
        description: "This is another nice plant.",
        details: {
          temperature: "75 degrees F day 62 degrees F night",
          water: "Summer: 3 litres Winter: 1.5 litre",
          nutrition: "A thing, something, other thing"
        }
      }]
    };

    _this.changeSlide = _this.changeSlide.bind(_this);
    return _this;
  }

  _createClass(Slideshow, [{
    key: "fireAnims",
    value: function fireAnims(duration) {
      var _this2 = this;

      this.setState({
        animating: true,
        animationDirection: "out"
      });
      // halfway
      setTimeout(function () {
        _this2.setState({
          animating: true,
          animationDirection: "in"
        });
      }, duration / 2);
      // done
      setTimeout(function () {
        _this2.setState({
          animating: false,
          animationDirection: ""
        });
      }, duration);
    }
  }, {
    key: "changeSlide",
    value: function changeSlide(dir) {
      var _this3 = this;

      var currentSlide = this.state.currentSlide;
      var slides = this.state.slides;

      if (dir === "right") {
        if (currentSlide < slides.length - 1) {
          this.fireAnims(this.state.animationDuration * 2);
          window.setTimeout(function () {
            _this3.setState({
              currentSlide: currentSlide + 1
            });
          }, this.state.animationDuration);
        }
      } else {
        if (currentSlide > 0) {
          this.fireAnims(this.state.animationDuration * 2);
          window.setTimeout(function () {
            _this3.setState({
              currentSlide: currentSlide - 1
            });
          }, this.state.animationDuration);
        }
      }
    }
  }, {
    key: "determineDir",
    value: function determineDir(delta) {
      if (delta > 0) {
        return "right";
      } else {
        return "left";
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        loaded: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var classes = ["slideshow"];
      if (this.state.animating) {
        classes.push("slideshow--animated slideshow--" + this.state.animationDirection);
      } else {
        classes = ["slideshow"];
      }
      return React.createElement(
        "div",
        { className: classes.join(" ") },
        React.createElement(Slide, {
          title: this.state.slides[this.state.currentSlide].title,
          image: this.state.slides[this.state.currentSlide].imageUrl,
          description: this.state.slides[this.state.currentSlide].description,
          details: this.state.slides[this.state.currentSlide].details,
          count: this.state.currentSlide + 1,
          changeSlide: this.changeSlide,
          slideLength: this.state.slides.length
        })
      );
    }
  }]);

  return Slideshow;
}(React.Component);

var Slide = function (_React$Component2) {
  _inherits(Slide, _React$Component2);

  function Slide() {
    _classCallCheck(this, Slide);

    var _this4 = _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).call(this));

    _this4.state = {};
    return _this4;
  }

  _createClass(Slide, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        { className: "slide" },
        React.createElement(
          "div",
          { className: "slide__decorative-sidebar" },
          React.createElement("img", { src: this.props.image })
        ),
        React.createElement(
          "div",
          { className: "slide__info" },
          React.createElement(
            "div",
            { className: "slide__info__text" },
            React.createElement(
              "h1",
              { className: "slide__info__title" },
              this.props.title
            ),
            React.createElement(
              "p",
              { className: "slide__info__description" },
              this.props.description
            )
          ),
          React.createElement("img", {
            src: this.props.image,
            alt: this.props.title,
            className: "slide__info__image"
          }),
          React.createElement(
            "div",
            { className: "slide__arrows" },
            React.createElement(
              "a",
              {
                className: this.props.count > 1 ? "slide__arrows__arrow" : "slide__arrows__arrow slide__arrows__arrow--disabled",
                onClick: function onClick(e) {
                  return _this5.props.changeSlide("left");
                }
              },
              "<"
            ),
            React.createElement(
              "a",
              {
                className: this.props.count < this.props.slideLength ? "slide__arrows__arrow" : "slide__arrows__arrow slide__arrows__arrow--disabled",
                onClick: function onClick(e) {
                  return _this5.props.changeSlide("right");
                }
              },
              ">"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "slide__next" },
          React.createElement(
            "span",
            null,
            "Next: Factors"
          )
        ),
        React.createElement(
          "div",
          { className: "slide__details" },
          React.createElement(
            "div",
            { className: "slide__details__title" },
            "Discover the details"
          ),
          React.createElement(
            "div",
            { className: "slide__details__block slide__details__block--temp" },
            React.createElement(
              "h3",
              { className: "slide__details__subtitle" },
              "Temperature"
            ),
            React.createElement(
              "p",
              { className: "slide__details__block__description" },
              this.props.details.temperature
            )
          ),
          React.createElement(
            "div",
            { className: "slide__details__block slide__details__block--water" },
            React.createElement(
              "h3",
              { className: "slide__details__subtitle" },
              "Water"
            ),
            React.createElement(
              "p",
              { className: "slide__details__block__description" },
              this.props.details.water
            )
          ),
          React.createElement(
            "div",
            { className: "slide__details__block slide__details__block--nutrition" },
            React.createElement(
              "h3",
              { className: "slide__details__subtitle" },
              "Nutrition"
            ),
            React.createElement(
              "p",
              { className: "slide__details__block__description" },
              this.props.details.nutrition
            )
          )
        ),
        React.createElement(
          "div",
          { className: "slide__count" },
          React.createElement(
            "p",
            { className: "slide__count__title" },
            "Explore"
          ),
          React.createElement(
            "span",
            { className: "slide__count__count" },
            "0",
            React.createElement(
              "span",
              null,
              this.props.count
            )
          )
        )
      );
    }
  }]);

  return Slide;
}(React.Component);

// RENDER

ReactDOM.render(React.createElement(Slideshow, null), document.getElementById("root"));