// src/components/ScanUpload.tsx
import { useState, ChangeEvent } from "react";

type AnyJson = any;

interface ScanSummary {
  ram?: {
    totalGb?: number;
    usedGb?: number;
  };
  disk?: {
    totalGb?: number;
    freeGb?: number;
  };
  systemInfo?: string;
}

interface ScanReport {
  summary: ScanSummary;
  issues: string[];
  recommendations: string[];
  raw?: AnyJson;
}

function pickNumber(...candidates: any[]): number | undefined {
  for (const value of candidates) {
    if (value === null || value === undefined) continue;

    if (typeof value === "number" && !Number.isNaN(value)) return value;

    if (typeof value === "string") {
      const cleaned = value.replace(/[^\d.,-]/g, "").replace(",", ".");
      const n = Number(cleaned);
      if (!Number.isNaN(n)) return n;
    }
  }
  return undefined;
}

function buildReport(data: AnyJson): ScanReport {
  const issues: string[] = [];
  const recommendations: string[] = [];

  const totalRamGb = pickNumber(
    data?.Memory?.TotalGB,
    data?.RAM?.TotalGB,
    data?.System?.TotalRAMGB,
    data?.TotalRamGb,
    data?.totalRamGb
  );

  const usedRamGb = pickNumber(
    data?.Memory?.UsedGB,
    data?.RAM?.UsedGB,
    data?.System?.UsedRAMGB,
    data?.UsedRamGb,
    data?.usedRamGb
  );

  const totalDiskGb = pickNumber(
    data?.Disk?.TotalGB,
    data?.Disks?.TotalGB,
    data?.Storage?.TotalGB,
    data?.totalDiskGb
  );

  const freeDiskGb = pickNumber(
    data?.Disk?.FreeGB,
    data?.Disks?.FreeGB,
    data?.Storage?.FreeGB,
    data?.freeDiskGb
  );

  const summary: ScanSummary = {
    ram: { totalGb: totalRamGb, usedGb: usedRamGb },
    disk: { totalGb: totalDiskGb, freeGb: freeDiskGb },
    systemInfo:
      data?.SystemInfo ??
      data?.System?.ComputerName ??
      data?.ComputerName ??
      undefined,
  };

  // --- RAM ---
  if (totalRamGb && usedRamGb) {
    const ramUsage = (usedRamGb / totalRamGb) * 100;
    if (ramUsage >= 90) {
      issues.push(`Uso de RAM muy alto (~${Math.round(ramUsage)}%).`);
      recommendations.push(
        "Cerrá programas en segundo plano, desactivá apps del inicio y considerá ampliar la RAM si este porcentaje se mantiene siempre alto."
      );
    } else if (ramUsage >= 80) {
      issues.push(`Uso de RAM elevado (~${Math.round(ramUsage)}%).`);
      recommendations.push(
        "Revisá qué apps consumen más memoria y desinstalá lo que no uses. También ayuda reiniciar la PC antes de jugar o trabajar."
      );
    }
  }

  // --- Disco ---
  if (totalDiskGb && freeDiskGb) {
    const freePct = (freeDiskGb / totalDiskGb) * 100;
    if (freePct <= 10) {
      issues.push(
        `Muy poco espacio libre en disco (~${Math.round(
          freePct
        )}% libre, aprox. ${Math.round(freeDiskGb)} GB).`
      );
      recommendations.push(
        "Eliminá archivos grandes que no uses, limpiá descargas y papelera, y mové contenido pesado (videos/juegos viejos) a un disco externo."
      );
    } else if (freePct <= 20) {
      issues.push(
        `Espacio libre en disco algo justo (~${Math.round(
          freePct
        )}% libre, aprox. ${Math.round(freeDiskGb)} GB).`
      );
      recommendations.push(
        "Liberar algo de espacio puede ayudar a que Windows y los juegos carguen más rápido."
      );
    }
  }

  // Si no encontramos nada específico, igual damos recomendaciones base
  if (issues.length === 0) {
    issues.push("No se detectaron problemas críticos con los datos disponibles.");
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Mantené Windows y los drivers actualizados, desinstalá programas que no uses y reiniciá la laptop con frecuencia para mantener el rendimiento estable."
    );
    recommendations.push(
      "Para gaming (CS2 u otros), es clave cerrar Discord, navegadores y apps pesadas mientras jugás."
    );
  }

  return {
    summary,
    issues,
    recommendations,
    raw: data,
  };
}

function ScanUpload() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);
    setReport(null);

    if (!file) {
      return;
    }

    setFileName(file.name);

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("El archivo debe ser un .json generado por el asistente.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        setLoading(true);
        const text = reader.result as string;
        const json = JSON.parse(text);

        const generatedReport = buildReport(json);
        setReport(generatedReport);
        setError(null);
      } catch (err) {
        console.error("Error leyendo el scan:", err);
        setError(
          "No pudimos leer el archivo. Asegurate de usar laptelligence_scan.json generado por el asistente."
        );
        setReport(null);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      console.error("Error de FileReader:", reader.error);
      setError("Ocurrió un problema al leer el archivo en tu navegador.");
    };

    reader.readAsText(file);
  };

  return (
    <section id="scan-upload" className="section">
      <div className="container">
        {/* <h2 className="section-title">Subí tu scan y generá el Reporte Inteligente</h2> */}
        <p className="section-subtitle">
          Ejecutá el asistente en tu laptop, y luego subí el archivo{" "}
          <code>laptelligence_scan.json</code> que se genera en tu Escritorio. Analizamos
          tus métricas básicas sin acceder a tus archivos personales.
        </p>

        <div className="scan-upload-card">
          <label className="scan-upload-label">
            Elegí el archivo del scan
            <input
              type="file"
              accept="application/json,.json"
              onChange={handleFileChange}
              className="scan-upload-input"
            />
          </label>

          {fileName && (
            <p className="scan-file-name">
              Archivo seleccionado: <span>{fileName}</span>
            </p>
          )}

          {loading && (
            <p className="scan-status">Analizando el archivo, esto puede tomar unos segundos…</p>
          )}

          {error && <p className="scan-error">{error}</p>}

          {report && !error && (
            <div className="scan-report">
              <h3 className="scan-report-title">Resumen del análisis</h3>

              <div className="scan-report-grid">
                <div className="scan-pill">
                  <span className="scan-pill-label">RAM</span>
                  <span className="scan-pill-value">
                    {report.summary.ram?.totalGb
                      ? `${Math.round(report.summary.ram.totalGb)} GB totales`
                      : "Sin datos claros"}
                  </span>
                </div>

                <div className="scan-pill">
                  <span className="scan-pill-label">Disco</span>
                  <span className="scan-pill-value">
                    {report.summary.disk?.freeGb && report.summary.disk?.totalGb
                      ? `${Math.round(report.summary.disk.freeGb)} GB libres de ${Math.round(
                          report.summary.disk.totalGb
                        )} GB`
                      : "Sin datos claros"}
                  </span>
                </div>

                {report.summary.systemInfo && (
                  <div className="scan-pill">
                    <span className="scan-pill-label">Equipo</span>
                    <span className="scan-pill-value">{report.summary.systemInfo}</span>
                  </div>
                )}
              </div>

              <div className="scan-columns">
                <div>
                  <h4 className="scan-subtitle">Problemas detectados</h4>
                  <ul className="scan-list">
                    {report.issues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="scan-subtitle">Recomendaciones</h4>
                  <ul className="scan-list">
                    {report.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <details className="scan-raw">
                <summary>Ver datos técnicos del scan (opcional)</summary>
                <pre>{JSON.stringify(report.raw, null, 2)}</pre>
              </details>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ScanUpload;
