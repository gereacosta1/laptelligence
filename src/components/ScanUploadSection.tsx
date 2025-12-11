import { useState } from "react";

type ScanData = {
  generated_at: string;
  os: string;
  os_version: string;
  hostname: string;
  cpu_name: string;
  cpu_cores: number;
  ram_total_gb: number;
  ram_free_gb: number;
  disks: { DeviceID: string; size_gb: number; free_gb: number }[];
  top_processes_ram: { Name: string; ram_mb: number }[];
};

type AnalysisResult = {
  summary: string;
  issues: string[];
  recommendations: string[];
};

function analyzeScan(scan: ScanData): AnalysisResult {
  const issues: string[] = [];
  const recommendations: string[] = [];

  const ramUsedGB = scan.ram_total_gb - scan.ram_free_gb;
  const ramUsedPct = Math.round((ramUsedGB / scan.ram_total_gb) * 100);

  if (ramUsedPct >= 85) {
    issues.push(
      `La RAM está muy cargada (${ramUsedPct}% en uso). Esto puede generar lentitud, stutters y microcortes.`
    );
    recommendations.push(
      "Cerrá navegadores y programas que no estés usando, especialmente los de la lista de procesos pesados."
    );
  } else if (ramUsedPct >= 70) {
    issues.push(
      `La RAM está moderadamente cargada (${ramUsedPct}% en uso). Hay margen, pero puede afectar juegos exigentes.`
    );
    recommendations.push(
      "Antes de jugar, cerrá programas secundarios (Discord, Chrome con muchas pestañas, etc.)."
    );
  }

  const lowDisks = scan.disks.filter(
    (d) => d.free_gb / d.size_gb < 0.15
  );

  if (lowDisks.length > 0) {
    const list = lowDisks.map((d) => `${d.DeviceID} (${d.free_gb} GB libres)`).join(", ");
    issues.push(
      `Algunos discos tienen poco espacio libre: ${list}. Abajo del 15% de espacio comienza a sentirse mucho la lentitud.`
    );
    recommendations.push(
      "Eliminá archivos grandes que no uses, vaciá la papelera y mové cosas a un disco externo o la nube."
    );
  }

  if (scan.top_processes_ram && scan.top_processes_ram.length > 0) {
    const top3 = scan.top_processes_ram
      .slice(0, 3)
      .map((p) => `${p.Name} (${p.ram_mb} MB)`)
      .join(", ");
    recommendations.push(
      `Revisá estos procesos que usan mucha RAM: ${top3}. Si no son críticos, cerralos antes de jugar o trabajar.`
    );
  }

  if (issues.length === 0) {
    issues.push(
      "No se detectaron problemas graves en las métricas básicas. Igual podés seguir las recomendaciones generales para mantener el rendimiento."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Mantené el sistema actualizado, liberá espacio en disco regularmente y evitá tener muchos programas abiertos en simultáneo."
    );
  }

  const summary = `Reporte generado para ${scan.hostname} (${scan.os}) el ${scan.generated_at}.`;

  return { summary, issues, recommendations };
}

export function ScanUploadSection() {
  const [scan, setScan] = useState<ScanData | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = reader.result as string;
        const data = JSON.parse(content);

        const analysisResult = analyzeScan(data as ScanData);
        setScan(data as ScanData);
        setAnalysis(analysisResult);
      } catch (err) {
        console.error(err);
        setError("No pudimos leer el archivo. Asegurate de usar laptelligence_scan.json generado por el asistente.");
        setScan(null);
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <section id="scan-upload" className="section scan-upload">
      <div className="section-header">
        <h2>Subí tu scan y generá el Reporte Inteligente</h2>
        <p>
          Ejecutá el asistente en tu laptop, y luego subí el archivo{" "}
          <code>laptelligence_scan.json</code> que se genera en tu Escritorio.
          Analizamos tus métricas básicas sin acceder a tus archivos personales.
        </p>
      </div>

      <div className="scan-upload__card">
        <label className="file-input-label">
          <span>Elegí el archivo del scan</span>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
          />
        </label>

        {loading && <p className="scan-upload__status">Analizando datos...</p>}
        {error && <p className="scan-upload__error">{error}</p>}

        {scan && analysis && (
          <div className="scan-result">
            <h3>Resumen del sistema</h3>
            <p>{analysis.summary}</p>

            <div className="scan-result__grid">
              <div>
                <h4>RAM</h4>
                <p>
                  Total: {scan.ram_total_gb} GB<br />
                  Libre: {scan.ram_free_gb} GB
                </p>
              </div>

              <div>
                <h4>Discos</h4>
                <ul>
                  {scan.disks.map((d) => (
                    <li key={d.DeviceID}>
                      {d.DeviceID}: {d.free_gb} GB libres de {d.size_gb} GB
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Procesos que más RAM usan</h4>
                <ul>
                  {scan.top_processes_ram.slice(0, 5).map((p) => (
                    <li key={p.Name}>
                      {p.Name}: {p.ram_mb} MB
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="scan-result__lists">
              <div>
                <h4>Problemas detectados</h4>
                <ul>
                  {analysis.issues.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Recomendaciones</h4>
                <ul>
                  {analysis.recommendations.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
