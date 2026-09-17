import { useState } from 'react'

type Lead = { id: string; name: string; score: number; status: 'quente'|'morno'|'frio'|'risco'; receita: number }

const mockLeads: Lead[] = [
  { id: '1', name: 'João Silva - Clínica', score: 92, status: 'quente', receita: 15000 },
  { id: '2', name: 'Maria Souza - E-commerce', score: 34, status: 'risco', receita: 8000 },
  { id: '3', name: 'Pedro Costa - SaaS', score: 78, status: 'morno', receita: 12000 },
]

export default function App() {
  const [leads] = useState<Lead[]>(mockLeads)
  const receitaProtegida = leads.filter(l=>l.status!=='risco').reduce((a,b)=>a+b.receita,0)
  const receitaRisco = leads.filter(l=>l.status==='risco').reduce((a,b)=>a+b.receita,0)

  return (
    <div style={{padding: '24px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter'}}>
      <header style={{marginBottom: '32px'}}>
        <h1 style={{fontSize: '32px', fontWeight: 800}}>🛡️ Lead Guard AI</h1>
        <p style={{opacity: 0.7}}>Defesa de Receita — Sistema Anti-Lead Frio</p>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px'}}>
        <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333'}}>
          <p>Receita Protegida</p><h2 style={{fontSize: '28px', color: '#22c55e'}}>R$ {receitaProtegida.toLocaleString('pt-BR')}</h2>
        </div>
        <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333'}}>
          <p>Em Risco</p><h2 style={{fontSize: '28px', color: '#ef4444'}}>R$ {receitaRisco.toLocaleString('pt-BR')}</h2>
        </div>
        <div style={{background: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333'}}>
          <p>Total Leads</p><h2 style={{fontSize: '28px'}}>{leads.length}</h2>
        </div>
      </div>

      <div style={{background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden'}}>
        {leads.map(lead=>(
          <div key={lead.id} style={{padding: '16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #222'}}>
            <div><strong>{lead.name}</strong><br/><small style={{opacity: 0.6}}>Score: {lead.score}/100</small></div>
            <span style={{padding: '6px 12px', borderRadius: '20px', background: lead.status==='quente'?'#22c55e':lead.status==='risco'?'#ef4444':'#eab308', color: '#000', fontWeight: 700, fontSize: '12px'}}>{lead.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
