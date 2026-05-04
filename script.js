const STORAGE_KEY = "weightTrackerData";
let editingEntryId = null; // Track which entry is being edited

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  setDefaultDateTime();
  loadData();
  updateChart();
  updateDataList();
  preventZoom();
});

// Prevent zoom on mobile devices
function preventZoom() {
  // Prevent double-tap zoom
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false,
  );

  // Prevent pinch zoom
  document.addEventListener("gesturestart", (e) => {
    e.preventDefault();
  });

  // Prevent zoom on input focus (iOS)
  document.addEventListener("focusin", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      // Small delay to ensure viewport is set
      setTimeout(() => {
        const viewport = document.querySelector("meta[name=viewport]");
        if (viewport) {
          viewport.content =
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        }
      }, 100);
    }
  });

  document.addEventListener("focusout", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      // Reset viewport after input blur
      setTimeout(() => {
        const viewport = document.querySelector("meta[name=viewport]");
        if (viewport) {
          viewport.content =
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        }
      }, 100);
    }
  });
}

// Set current date and time as default
function setDefaultDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  document.getElementById("datetime").value =
    `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Get data from local storage
function loadData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

// Save data to local storage
function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Add new entry
function addEntry() {
  const datetimeInput = document.getElementById("datetime").value;
  const weightInput = document.getElementById("weight").value;

  if (!datetimeInput || !weightInput) {
    showNotification("Please fill in all fields", true);
    return;
  }

  const data = loadData();

  if (editingEntryId) {
    // Update existing entry
    const entryIndex = data.findIndex((entry) => entry.id === editingEntryId);
    if (entryIndex !== -1) {
      data[entryIndex] = {
        ...data[entryIndex],
        datetime: datetimeInput,
        weight: parseFloat(weightInput),
      };
      showNotification("Entry updated successfully!");
    }
    editingEntryId = null; // Reset editing state
    updateButtonText();
  } else {
    // Add new entry
    const entry = {
      datetime: datetimeInput,
      weight: parseFloat(weightInput),
      id: Date.now(),
    };
    data.push(entry);
    showNotification("Entry added successfully!");
  }

  data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  saveData(data);

  clearForm();
  updateChart();
  updateDataList();
}

// Delete entry
function deleteEntry(id) {
  let data = loadData();
  data = data.filter((entry) => entry.id !== id);
  saveData(data);
  updateChart();
  updateDataList();
  showNotification("Entry deleted!");
}

// Edit entry
function editEntry(id) {
  const data = loadData();
  const entry = data.find((entry) => entry.id === id);

  if (entry) {
    // Set editing state
    editingEntryId = id;

    // Fill form with entry data
    document.getElementById("datetime").value = entry.datetime;
    document.getElementById("weight").value = entry.weight;

    // Update button text
    updateButtonText();

    // Focus on weight field
    document.getElementById("weight").focus();

    // Scroll to form
    document.querySelector(".form-group").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    showNotification(
      'Entry loaded for editing. Update and click "Update Entry" to save changes.',
    );
  }
}

// Clear form
function clearForm() {
  document.getElementById("weight").value = "";
  setDefaultDateTime();
  document.getElementById("weight").focus();
  editingEntryId = null; // Reset editing state
  updateButtonText();
}

// Update button text based on editing state
function updateButtonText() {
  const button = document.querySelector(".btn-primary");
  if (editingEntryId) {
    button.textContent = "Update Entry";
  } else {
    button.textContent = "Add Entry";
  }
}

// Update chart
function updateChart() {
  const data = loadData();

  if (data.length === 0) {
    document.getElementById("chartContainer").innerHTML =
      '<div style="text-align: center; padding: 40px; color: #999;">No data to display</div>';
    return;
  }

  const chartData = data.map((entry) => {
    const date = new Date(entry.datetime);
    return [date.getTime(), entry.weight];
  });

  Highcharts.chart("chartContainer", {
    chart: {
      type: "line",
      backgroundColor: "transparent",
      borderRadius: 6,
    },
    title: {
      text: null,
    },
    xAxis: {
      type: "datetime",
      dateTimeLabelFormats: {
        month: "%e. %b",
        year: "%b",
      },
    },
    yAxis: {
      title: {
        text: "Weight (kg)",
      },
    },
    series: [
      {
        name: "Weight",
        data: chartData,
        color: "#667eea",
        fillOpacity: 0.1,
        marker: {
          radius: 5,
          fillColor: "#667eea",
        },
        lineWidth: 2,
      },
    ],
    plotOptions: {
      area: {
        stacking: "normal",
      },
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          enabled: true,
        },
      },
      menuItemDefinitions: {
        viewFullscreen: {
          textKey: "viewFullscreen",
          onclick: function () {
            const chart = this;
            const container = chart.container;
			/**@type {HTMLDivElement} */
            const parentElement = container.parentElement;

            const isMobile = window.innerWidth <= 768;

            const toggle = () => {
              const isFull = container.classList.toggle("chart-fullscreen");

              document.body.style.overflow = isFull ? "hidden" : "";

			  console.log(container, parentElement.clientWidth)
              setTimeout(() => {
                const rect = container.getBoundingClientRect();

                chart.setSize(
                  isFull ? rect.width : parentElement.clientWidth - 20,
                  isFull ? rect.height : 368,
                  false, // IMPORTANT: no animation lag
                );

                chart.reflow();
              }, 150);
            };

            if (isMobile) {
              toggle();
            } else {
              if (!document.fullscreenElement) {
                container.requestFullscreen?.();
              } else {
                document.exitFullscreen?.();
              }

              setTimeout(() => {
                chart.reflow();
                chart.setSize();
              }, 150);
            }
          },
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            chart: {
              height: 300,
            },
          },
        },
      ],
    },
  });
}

// Update data list
function updateDataList() {
  const data = loadData();
  const dataList = document.getElementById("dataList");

  if (data.length === 0) {
    dataList.innerHTML =
      '<div class="data-list-empty">No entries yet. Add one to get started!</div>';
    return;
  }

  dataList.innerHTML = data
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    .map((entry) => {
      const date = new Date(entry.datetime);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      return `
                <div class="data-item">
                    <div class="data-item-info">
                        <div class="data-item-date">${formattedDate}</div>
                        <div class="data-item-weight">${entry.weight.toFixed(2)} kg</div>
                    </div>
                    <div class="data-item-actions">
                        <button class="btn-secondary" onclick="editEntry(${entry.id})">Edit</button>
                        <button class="btn-danger" onclick="deleteEntry(${entry.id})">Delete</button>
                    </div>
                </div>
            `;
    })
    .join("");
}

// Copy to clipboard
function copyToClipboard() {
  const data = loadData();
  const jsonString = JSON.stringify(data, null, 2);

  navigator.clipboard
    .writeText(jsonString)
    .then(() => {
      showNotification("Copied to clipboard!");
    })
    .catch(() => {
      showNotification("Failed to copy to clipboard", true);
    });
}

// Download file
function downloadFile() {
  const data = loadData();
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `weight-tracker-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotification("File downloaded!");
}

// Import data
function importData() {
  const importText = document.getElementById("importData").value.trim();

  if (!importText) {
    showNotification("Please paste JSON data", true);
    return;
  }

  try {
    const importedData = JSON.parse(importText);

    if (!Array.isArray(importedData)) {
      throw new Error("Data must be an array");
    }

    // Validate data structure
    importedData.forEach((entry) => {
      if (!entry.datetime || typeof entry.weight !== "number") {
        throw new Error("Invalid data structure");
      }
    });

    // Ask for confirmation if data exists
    const existingData = loadData();
    if (existingData.length > 0) {
      if (!confirm("This will replace your existing data. Continue?")) {
        return;
      }
    }

    // Ensure all entries have unique IDs
    importedData.forEach((entry) => {
      if (!entry.id) {
        entry.id = Date.now() + Math.random();
      }
    });

    saveData(importedData);
    document.getElementById("importData").value = "";
    updateChart();
    updateDataList();
    showNotification("Data imported successfully!");
  } catch (error) {
    showNotification("Invalid JSON format: " + error.message, true);
  }
}

// Clear import textarea
function clearImport() {
  document.getElementById("importData").value = "";
}

// Show notification
function showNotification(message, isError = false) {
  const notification = document.createElement("div");
  notification.className = `notification ${isError ? "error" : ""}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Allow Enter key to add entry
document.getElementById("weight")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addEntry();
  }
});
