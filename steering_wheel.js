Chart.defaults.steering_wheel = Chart.defaults.doughnut;

var steering_wheel = Chart.controllers.doughnut.extend({
    draw: function(ease) {
        var meta = this.getMeta();
        var pt0 = meta.data[0];

        var ctx = this.chart.chart.ctx;
        ctx.save();

        var cx = pt0._view.x;
        var cy = pt0._view.y;
        var innerRadius = pt0._view.innerRadius;
        var outerRadius = pt0._view.outerRadius;
        var config = this.chart.chart.config;
        var current = config.data.current;
        var max = config.options.panel.max;
        var min = config.options.panel.min;
        var needle = config.options.needle;

        if (current >= 360) {
            current -= 360;
        } else if (current <= -360) {
            current += 360;
        } 
        if (current < 0) {
            current += 360;
        }
        if (current >= max) {
            current = max;
        }
        if (current <= min) {
            current = min;
        }
        var needleAngle = config.options.circumference * (current - min) / (max - min) + config.options.rotation;
        var radius = outerRadius * needle.lengthRadius / 100;
        var circleRadius = outerRadius * needle.circleRadius / 100;
        var needleInnerWidth = outerRadius * needle.innerWidth / 100;
        var needleOuterWidth = outerRadius * needle.outerWidth / 100;
        var textSize = outerRadius * needle.textSize / 100;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(needleAngle);
        ctx.beginPath();
        ctx.moveTo(0, -needleInnerWidth);
        ctx.lineTo(radius, -needleOuterWidth);
        ctx.lineTo(radius, needleOuterWidth);
        ctx.lineTo(0, needleInnerWidth);
        ctx.fillStyle = needle.color || 'rgba(180, 0, 0, 0.8)';
        ctx.fill();
        ctx.rotate(-Math.PI/2);
        ctx.beginPath();
        ctx.moveTo(0, -needleInnerWidth);
        ctx.lineTo(radius, -needleOuterWidth);
        ctx.lineTo(radius, needleOuterWidth);
        ctx.lineTo(0, needleInnerWidth);
        ctx.fillStyle = needle.color || 'rgba(180, 0, 0, 0.8)';
        ctx.fill();
        ctx.rotate(Math.PI);
        ctx.beginPath();
        ctx.moveTo(0, -needleInnerWidth);
        ctx.lineTo(radius, -needleOuterWidth);
        ctx.lineTo(radius, needleOuterWidth);
        ctx.lineTo(0, needleInnerWidth);
        ctx.fillStyle = needle.color || 'rgba(180, 0, 0, 0.8)';
        ctx.fill();
        ctx.rotate(-needleAngle);
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.fillStyle = needle.circleColor || 'rgba(188, 188, 188, 1)';
        ctx.arc(cx, cy, circleRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.font = ctx.font.replace(/\d+px/, textSize + "px");
        ctx.fillStyle = needle.textColor || 'rgba(255, 255, 255, 1)';
        var text = "" + config.data.current + String.fromCharCode(176);
        var textWidth = ctx.measureText(text).width;
        ctx.fillText(text, cx - (textWidth / 2), cy + textSize / 2);
        ctx.restore();

        Chart.controllers.doughnut.prototype.draw.call(this, ease);
    },

    initialize: function(chart, datasetIndex) {
        var panel = chart.chart.config.options.panel;
        var data = [100];
        var backgroundColor = [panel.scaleBackgroundColor || "rgb(120, 120, 120)"];
        var hoverBackgroundColor = [panel.scaleBackgroundColor || "rgb(120, 120, 120)"];
        
        var values = [];
        if (panel.tickInterval && panel.tickInterval != 0) {
            for (var v = panel.min; v <= panel.max; v += panel.tickInterval) {
                values.push(v);
            }
        }

        chart.chart.config.data.datasets[0].data = data;
        chart.chart.config.data.datasets[0].backgroundColor = backgroundColor;
        chart.chart.config.data.datasets[0].hoverBackgroundColor = hoverBackgroundColor;
        chart.chart.config.data.datasets[0].values = values;

        Chart.controllers.doughnut.prototype.initialize.call(this, chart, datasetIndex);
    }
});

Chart.controllers.steering_wheel = steering_wheel;