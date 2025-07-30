import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";

// 更拟真的K线数据生成（开盘价随机在收盘价±0.3内，最高最低价±0~0.8区间）
function generateRealisticKLine(dateArr, closeArr) {
  return dateArr.map((date, i) => {
    const close = closeArr[i];
    // 开盘价上下浮动 ±0.3，第一天开盘=收盘
    const open = i === 0 ? close : +(close + (Math.random() - 0.5) * 0.6).toFixed(2);
    // 最高价不低于开盘收盘最大值，浮动0~0.8
    const high = +(
      Math.max(open, close) + Math.random() * 0.8
    ).toFixed(2);
    // 最低价不高于开盘收盘最小值，浮动0~0.8
    const low = +(
      Math.min(open, close) - Math.random() * 0.8
    ).toFixed(2);

    return [open, close, low, high];
  });
}

export default function RealisticKLineChart({ dateArr, priceArr }) {
  const [showLine, setShowLine] = useState(false);
  const klineData = generateRealisticKLine(dateArr, priceArr);

  const option = {
    backgroundColor: "#fff",
    title: {
      text: "拟真K线图" + (showLine ? " + 收盘价折线" : ""),
      left: 10,
      textStyle: { color: "#222", fontWeight: "700", fontSize: 18 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      backgroundColor: "rgba(50,50,50,0.85)",
      textStyle: { color: "#fff", fontSize: 14 },
      formatter: (params) => {
        const k = params.find(p => p.seriesType === "candlestick");
        if (!k) return "";
        let tip = `<div style="line-height:1.5;">
          <strong>日期:</strong> ${k.name}<br/>
          <strong>开盘:</strong> ${k.data[0].toFixed(2)}<br/>
          <strong>收盘:</strong> ${k.data[1].toFixed(2)}<br/>
          <strong>最低:</strong> ${k.data[2].toFixed(2)}<br/>
          <strong>最高:</strong> ${k.data[3].toFixed(2)}<br/>`;
        if (showLine) {
          const l = params.find(p => p.seriesType === "line");
          if (l) tip += `<strong>收盘价折线:</strong> ${l.data.toFixed(2)}<br/>`;
        }
        tip += "</div>";
        return tip;
      },
    },
    xAxis: {
      type: "category",
      data: dateArr,
      scale: true,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "#444" } },
      axisTick: { alignWithLabel: true },
      splitLine: { show: false },
      axisLabel: { color: "#555", fontSize: 12 },
      min: "dataMin",
      max: "dataMax",
    },
    yAxis: {
      scale: true,
      splitLine: { lineStyle: { type: "dashed", color: "#ddd" } },
      axisLine: { lineStyle: { color: "#444" } },
      axisLabel: { color: "#555", fontSize: 12 },
      splitArea: { show: true, areaStyle: { color: ["#f9fafb", "#e6e9ef"] } },
    },
    grid: { left: "10%", right: "10%", bottom: "15%", top: 50 },
    dataZoom: [
      { type: "inside", start: 50, end: 100 },
      {
        show: true,
        type: "slider",
        top: "90%",
        start: 50,
        end: 100,
        handleSize: "80%",
        handleStyle: { color: "#888" },
        textStyle: { color: "#666" },
      },
    ],
    series: [
      {
        name: "K线",
        type: "candlestick",
        data: klineData,
        itemStyle: {
          color: "#26a69a",
          color0: "#ef5350",
          borderColor: "#26a69a",
          borderColor0: "#ef5350",
          shadowColor: "rgba(0,0,0,0.15)",
          shadowBlur: 8,
        },
        emphasis: { itemStyle: { borderWidth: 2 } },
        barWidth: 10,
      },
      ...(showLine
        ? [
            {
              name: "收盘价折线",
              type: "line",
              data: priceArr,
              smooth: true,
              lineStyle: { color: "#3f51b5", width: 2.5 },
              symbol: "circle",
              symbolSize: 6,
              itemStyle: { color: "#3f51b5" },
            },
          ]
        : []),
    ],
  };

  return (
    <div>
      <button
        style={{
          marginBottom: 8,
          padding: "6px 12px",
          borderRadius: 4,
          border: "1px solid #888",
          background: showLine ? "#3f51b5" : "#fff",
          color: showLine ? "#fff" : "#333",
          cursor: "pointer",
        }}
        onClick={() => setShowLine(!showLine)}
      >
        {showLine ? "隐藏收盘价折线" : "显示收盘价折线"}
      </button>

      <ReactEcharts
        option={option}
        style={{ height: "480px", width: "100%" }}
        notMerge={true}
        lazyUpdate={true}
        theme={"light"}
      />
    </div>
  );
}
