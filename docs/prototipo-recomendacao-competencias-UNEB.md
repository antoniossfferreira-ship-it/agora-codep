# Protótipo de sistema de recomendação de cursos por competências (UNEB)

## 1) Objetivo do protótipo
Construir um sistema que recomende formações personalizadas para servidores técnicos administrativos (Técnico e Analista Universitário) com base em:
- **Perfil funcional atual** (cargo, unidade, atividades exercidas).
- **Matriz de competências institucionais** derivada de documentos oficiais.
- **Lacunas de competência (gap)** entre o nível esperado e o nível evidenciado.
- **Trilhas formativas** alinhadas à andragogia, formação em serviço e formação continuada.

---

## 2) Escopo mínimo viável (MVP de pesquisa)
Para um protótipo de mestrado, foque no que comprova valor científico e aplicabilidade institucional.

### Entradas
- Documentos institucionais: PDI, Plano de Cargos e Salários, Estatuto, Planejamento Estratégico e Plano de Gestão.
- Catálogo de cursos (internos e/ou externos) com metadados.
- Dados do servidor (cargo, lotação, tempo de serviço, histórico formativo).
- Autoavaliação e avaliação da chefia (opcional no MVP, mas recomendável).

### Saídas
- Lista ranqueada de cursos recomendados por servidor.
- Justificativa da recomendação (transparência algorítmica).
- Plano/trilha de desenvolvimento individual.
- Histórico evolutivo de competências e formações.

---

## 3) Arquitetura conceitual recomendada

### Camada A — Ontologia/Matriz de Competências
1. Extrair funções e responsabilidades dos documentos institucionais.
2. Converter em um **dicionário de competências** (técnicas, comportamentais e de gestão).
3. Definir níveis de proficiência (ex.: 1 a 5).
4. Relacionar competências por tipo de cargo e contexto de atuação.

### Camada B — Base de Cursos
Cada curso deve possuir:
- Competências cobertas.
- Nível de profundidade.
- Carga horária, modalidade (EAD/presencial/híbrido), pré-requisitos.
- Evidências de aprendizagem (certificado, projeto aplicado, avaliação).

### Camada C — Motor de Recomendação híbrido
- **Baseado em regras** (necessário para governança e explicabilidade):
  - Se lacuna em competência X > limiar, recomendar cursos associados a X.
  - Priorizar competências críticas para o cargo/unidade.
- **Baseado em similaridade** (incremental):
  - Recomendações por perfis semelhantes (cargo, setor, trilhas concluídas).
- **Ranqueamento multiobjetivo**:
  - Gap de competência, relevância institucional, interesse do servidor, disponibilidade e custo.

### Camada D — Interface e Experiência
- Painel do servidor: autodiagnóstico, recomendações, trilha, progresso.
- Painel de gestão: visão agregada por unidade, lacunas coletivas, indicadores.
- Mecanismos de autonomia: servidor pode ajustar metas e preferências de aprendizagem.

---

## 4) Como transformar documentos institucionais em matriz de competências

### Etapa 1: Protocolo de extração
- Defina uma ficha de extração com campos padronizados:
  - Documento, seção, função/atribuição, evidência textual, competência associada.
- Use análise de conteúdo (manual + apoio computacional).

### Etapa 2: Normalização semântica
- Consolidar sinônimos (ex.: “atendimento ao público” e “relacionamento com usuário”).
- Criar taxonomia hierárquica:
  - Macrocompetência > competência > indicadores comportamentais.

### Etapa 3: Validação especialista
- Oficina com RH, gestores e servidores experientes.
- Técnica Delphi simplificada para consenso sobre competências críticas.

### Etapa 4: Rubricas de proficiência
- Para cada competência, descrever evidências observáveis por nível.
- Isso reduz subjetividade e melhora a qualidade do matching curso-servidor.

---

## 5) Modelo de dados essencial

### Entidades principais
- **Servidor**: id, cargo, unidade, tempo de serviço, interesses.
- **Competência**: id, nome, categoria, descrição, nível-alvo por cargo.
- **Curso**: id, título, competências-alvo, nível, modalidade, duração.
- **AvaliaçãoCompetência**: servidor_id, competência_id, nível_atual, fonte (auto/chefia/evidência), data.
- **Recomendação**: servidor_id, curso_id, score, justificativa, data.
- **HistóricoFormativo**: servidor_id, curso_id, conclusão, evidência, impacto percebido.

### Relações críticas
- Cargo ↔ Competências esperadas.
- Curso ↔ Competências desenvolvidas.
- Servidor ↔ Nível atual por competência.
- Gap = nível esperado - nível atual.

---

## 6) Algoritmo de recomendação (versão prática para MVP)

### Score sugerido
`score = (0,40 * gap_competencial) + (0,25 * prioridade_institucional) + (0,20 * aderencia_perfil) + (0,10 * preferencia_servidor) + (0,05 * viabilidade_oferta)`

### Regras complementares
- Excluir cursos já concluídos recentemente (janela de reciclagem).
- Penalizar cursos com pré-requisito não atendido.
- Bônus para cursos com evidência de aplicação no trabalho.

### Explicabilidade (obrigatória)
Toda recomendação deve explicar:
1. Qual lacuna ela atende.
2. Qual objetivo institucional ela apoia.
3. Qual ganho esperado na atuação do servidor.

---

## 7) Fundamentos pedagógicos aplicados

### Andragogia
- Diagnóstico inicial com participação ativa do servidor.
- Trilhas flexíveis e personalizadas.
- Conteúdos contextualizados em problemas reais de trabalho.

### Formação em serviço
- Priorização de cursos com aplicação imediata no setor.
- Atividades práticas e projetos de melhoria.

### Formação continuada
- Ciclo permanente de avaliação → recomendação → formação → reavaliação.
- Histórico longitudinal de evolução de competências na carreira.

---

## 8) Indicadores de excelência, funcionalidade e efetividade

### Qualidade técnica do sistema
- Precisão percebida das recomendações (feedback do usuário).
- Taxa de aceitação das recomendações.
- Taxa de conclusão dos cursos recomendados.

### Impacto formativo
- Redução do gap médio por competência.
- Evolução por trilha/cargo/unidade.
- Transferência para o trabalho (autoavaliação + chefia).

### Impacto institucional
- Alinhamento com metas estratégicas da UNEB.
- Cobertura de competências críticas por unidade.
- Custo-efetividade das ações de formação.

### Experiência e governança
- Nível de transparência do algoritmo.
- Percepção de justiça e não discriminação.
- Tempo de resposta do sistema e usabilidade.

---

## 9) Governança, ética e LGPD
- Minimização de dados pessoais e uso orientado por finalidade.
- Consentimento e ciência sobre uso dos dados para desenvolvimento.
- Separar uso para desenvolvimento formativo de uso punitivo.
- Auditoria periódica para vieses (cargo, gênero, unidade, tempo de casa).
- Trilhas de auditoria das recomendações.

---

## 10) Roadmap de implementação (12 meses)

### Fase 1 (Meses 1–3) — Descoberta e modelagem
- Levantamento documental e entrevistas.
- Versão 1 da matriz de competências.
- Definição do modelo de dados e protótipo de telas.

### Fase 2 (Meses 4–6) — MVP funcional
- Banco de dados inicial.
- Cadastro de cursos com metadados.
- Motor de recomendação baseado em regras + score.
- Painel básico do servidor.

### Fase 3 (Meses 7–9) — Piloto controlado
- Piloto em 1–2 unidades administrativas.
- Coleta de feedback de utilidade/clareza.
- Ajustes de rubricas, pesos e UX.

### Fase 4 (Meses 10–12) — Avaliação e consolidação
- Avaliação de efetividade (pré e pós).
- Relatório analítico para a pesquisa.
- Plano de escalonamento institucional.

---

## 11) Produto de dissertação: evidências esperadas
Para fortalecer a pesquisa de mestrado, documente:
1. Método de construção da matriz de competências.
2. Critérios de recomendação e justificativa dos pesos.
3. Resultados do piloto (métricas quantitativas + qualitativas).
4. Percepção dos servidores sobre autonomia e personalização.
5. Limites, riscos e recomendações para adoção em larga escala.

---

## 12) Stack tecnológica sugerida (simples e robusta)
- **Frontend**: React + painel de autodiagnóstico e recomendações.
- **Backend**: Node.js/TypeScript com API REST.
- **Banco**: PostgreSQL.
- **Analytics**: Metabase/Power BI para indicadores.
- **IA opcional**: NLP para apoiar extração inicial de competências dos documentos (sempre com validação humana).

---

## 13) Critérios de sucesso do protótipo
O protótipo será considerado excelente se:
- Entregar recomendações úteis e compreensíveis para os servidores.
- Demonstrar redução mensurável de lacunas de competências.
- Aumentar percepção de autonomia no desenvolvimento profissional.
- Evidenciar aderência às estratégias institucionais e às bases pedagógicas.
- Manter governança ética, transparência e conformidade legal.
