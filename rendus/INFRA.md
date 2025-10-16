# Hackathon - Ynov Toulouse 2025 : Babyfoot du futur - Cloud & Infrastructure

## Equipe

- Cloud & Infrastructure 1 : MARTIAL Quentin
- Cloud & Infrastructure 2 : AMOUSSA Hamdoune
- Cloud & Infrastructure 3 : BANCE Ousmane

Et si on réinventait l’expérience babyfoot à Ynov ? L’objectif de ce hackathon est de moderniser et digitaliser l’usage des babyfoots présents dans le Souk pour créer un service _next-gen_, pensé pour près de 1000 étudiants !

Que ce soit via des gadgets connectés, un système de réservation intelligent, des statistiques en temps réel ou des fonctionnalités robustes pour une utilisation massive, nous cherchons des solutions innovantes qui allient créativité et technologie.

Toutes les filières sont invitées à contribuer : Dev, Data, Infra, IoT, Systèmes embarqués… chaque idée compte pour rendre le babyfoot plus fun, plus pratique et plus connecté.

Votre mission : transformer le babyfoot classique en expérience high-tech pour Ynov !

---

> Ce fichier contient les informations spécifiques au Cloud & Infra de votre projet. Il suffit d'en remplir une seule fois, même si vous êtes plusieurs Cloud & Infra dans l'équipe.

# Requis


### Architecture technique
- Vue d’ensemble des composants et flux.
- Zones de confiance, exposition externe, et dépendances critiques.
- schéma

### Environnements
- Production, Préproduction, Recette, Développement.
- Différences clés par environnement (tailles, secrets, feature flags).

| Environnement | Domaine | Objectif | Différences clés |
|---|---|---|---|
| Prod | | | |
| Préprod | | | |
| Recette | | | |
| Dev | | | |

### Pile technologique
- Compute: Portainer, Docker, bare-metal.
- Réseau: NGINX.
- Données: MySQL, Mariadb.
- Observabilité: Prometheus/Grafana,Checkmk.
- CI/CD: GitLab CI.
- IaC & config: Ansible.

### Justification des choix
- Contraintes: sécurité, budget, compétences, délais, conformité.
- Critères de sélection: simplicité, maintenabilité, SLA, performance.

| Composant | Option choisie | Alternatives | Raisons principales | Impacts/Trade-offs |
|---|---|---|---|---|
| Orchestration | Ansible | Puppet | simplicité | que des avantages pour la taille du projet |
| Proxy/Ingress | Nginx | HAproxy, Traefik | gestion des entrées automatique et création de certif | |
| Base de données | Mariadb | MySQL, Postges, N | | |
| Stockage objet | | | | |
| CI/CD | | | | |
| Observabilité | | | | |

### Infrastructure as Code
- Portée IaC: réseaux, compute, stockage, DNS, secrets.
- Structuration des dépôts et conventions.
- Politique de revue, tests et déploiement IaC.

```bash
# Exemple d’inventaire Ansible (à adapter)
[managers]
swarm-mgr-1 ansible_host= ...
[workers]
swarm-wkr-[1:3] ansible_host= ...
```

### Déploiement applicatif
- Modèle: Docker Compose
- Stratégies: blue/green, canary, rolling.
- Variables d’environnement et templates.

```yaml
# Extrait docker stack/compose
services:
  app:
    image: registry.example.com/app:${VERSION}
    deploy:
      replicas: 3
      update_config:
        order: start-first
    environment:
      APP_ENV: production
```

### CI/CD et qualité
- Pipelines: build, test, scan, release, déploiement.
- Artefacts: images signées, provenance, SBOM.
- Politique de branches, tags et versionnement.

```yaml
# Extrait .gitlab-ci.yml
stages: [build, test, scan, deploy]
variables:
  DOCKER_DRIVER: overlay2
build:
  stage: build
  script: [ "docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA ." ]
```

### Sécurité et secrets
- AuthN/AuthZ: SSO, RBAC, clés d’accès.
- Gestion des secrets: Ansible Vault.
- Surfaces d’attaque, patching, durcissement.

- Journalisation sécurité et détection d’incidents.
- Politique de rotation et durée de vie des secrets.

### Réseau, DNS et certificats
- Schéma IP, subnets, VLANs, security groups.
- Stratégie DNS et enregistrements.
- TLS: émission, renouvellement, politiques de ciphers.

### Observabilité et exploitation
- Logs: rétention, indexation, requêtes types.
- Metrics et alertes: SLO/SLA, seuils et runbooks.
- Traces: propagation et corrélation.

### Performance et capacité
- Dimensionnement initial et headroom.
- Tests de charge et profilage.
- Plan d’élasticité et limites.

### Résilience, sauvegardes et PRA
- Stratégie de sauvegarde: quoi, quand, où, rétention.
- Tests de restauration et RPO/RTO.
- Tolérance aux pannes et anti-affinité.

```bash
# Vérification d’un backup/restauration
ansible-playbook restore.yml --check
```

### Coûts et optimisation
- Estimation des coûts (compute, stockage, transfert).
- Optimisations: bin packing, réservations, cycles de vie S3.
- Arbitrages coût vs performance.

### Procédures d’exploitation
- Démarrage/arrêt contrôlé.
- Rotation des certificats et mises à jour.
- Gestion des incidents et communication.

- Checklists opérationnelles:
  - [ ] Santé des services
  - [ ] Espace disque
  - [ ] Certificats < 30 jours
  - [ ] Sauvegardes vérifiées

### Dépendances et compatibilité
- Versions minimales requises.
- Intégrations externes et SLAs.
- Matrice de compatibilité.

### Risques et dettes techniques
- Risques majeurs et plans de mitigation.
- Dettes acceptées et échéance de traitement.
- Hypothèses clés à revalider.

### Roadmap et évolutions
- Prochaines itérations et jalons.
- Expérimentations prévues.
- Critères de sortie et succès.

### FAQ rapide
- Comment déployer localement ?
- Que faire en cas d’alerte critique ?
- Où trouver les dashboards utiles ?

### Annexes
- Glossaire.
- Variables d’environnement centralisées.
- Modèles de runbooks et checklists.

***

Souhaites-tu une variante plus ciblée Docker Swarm, Kubernetes, ou mixte avec GitLab CI et Ansible pré-remplis selon ton contexte à l’Université de Toulouse ?
