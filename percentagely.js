function PercentageLy(id, options) {
    this.percentage = 0;
    this.defaultColor = "#79be9b";
    this.hidePercentageSymbol = false;

    this.init = function () {
        var template = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">' +
                            '<g>' +
                                '<circle class="loading-circle" cx="80" cy="80" r="60" stroke="%color%"></circle>' +
                                    '<text class="percentage-text" x="27%" y="47%" text-anchor="middle" fill="%color%" dy=".6em" font-family="Helvetica" font-size="30">0%</text>' +
                            '</g>' +
                        '</svg>';

        if(options){
            if(options.color !== undefined) this.defaultColor = options.color;
            if(options.percentage !== undefined) this.percentage = options.percentage;
            if(options.hidePercentageSymbol !== undefined) this.hidePercentageSymbol = options.hidePercentageSymbol;
        }
        try {
            this.element = document.getElementById(id);
            this.element.classList.add("percentagely");
            this.element.innerHTML = template.replace(/%color%/g, this.defaultColor);
            this.circleElement = this.element.getElementsByTagName("circle")[0];
            this.textElement = this.element.getElementsByTagName("text")[0];
            this.setValue(this.percentage);
        } catch(e) {
            throw "Invalid element or element not found";
            return undefined;
        }
    }

    this.setValue = function(value) {
        if(value <= 100) {
            this.circleElement.style.strokeDashoffset = 377 - 3.77*value;
            this.textElement.innerHTML = value + (this.hidePercentageSymbol ? "" : "%");
            this.percentage = value;
        } else {
            throw "Invalid percetage value";
        }
    }
    this.setColor = function(color) {
        if(color === undefined) {
            this.circleElement.style.stroke = this.defaultColor;
            this.textElement.style.fill = this.defaultColor;
        } else {
            this.circleElement.style.stroke = color;
            this.textElement.style.fill = color;
        }
    }
    this.init();
}