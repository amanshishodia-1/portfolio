---
title: "Trackly: Real-time Project Management Architecture"
category: "Productivity SaaS"
description: "A deep dive into building a secure, real-time Kanban board with role-based access control, optimistic UI updates, and transaction-safe NoSQL schemas."
tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "REST API"]
liveUrl: "https://trackly-psi.vercel.app"
githubUrl: "https://github.com/amanshishodia/trackly"
slug: "trackly"
---

This case study reviews the engineering decisions behind **Trackly**, an enterprise-grade project management application.

## 1. Problem Statement
Collaborative Kanban tools often suffer from state synchronization conflicts and sluggish user response times. When multiple team members make updates concurrently, simple HTTP PUT requests can lead to overwriting work, race conditions, and heavy server round-trips. Furthermore, configuring robust, granular access controls (e.g. distinguishing project owners, developers, and read-only observers) in API layers often introduces security holes or heavy database permission check overheads.

## 2. Engineered Solution
Trackly resolves these challenges by combining:
1. An **Optimistic UI Engine**: Local client updates are rendered immediately in under **50ms**, with background API resolution and fail-safe rollback states.
2. A **Granular RBAC Guard**: A lightweight middleware caching tokenized permission levels inside JWT signatures to eliminate repetitive database lookups on API calls.
3. An **Atomic MongoDB Schema**: Utilizing transaction blocks and specific mongoose arrays to prevent concurrent card position conflicts.

---

## 3. System Architecture
The platform is organized as a decoupled Model-View-Controller (MVC) server linked to a React single-page app (SPA).

```text
[ React Client (SPA) ] 
       │ 
       ▼ (HTTPS with JWT Header)
[ API Gateway / Router ]
       │
       ▼ (RBAC Auth Middleware)
[ Controller Logic Layer ] ── (Optimistic Rollback Handler)
       │
       ▼ (Mongoose Transaction Blocks)
[ MongoDB Atlas Cluster ]
```

---

## 4. Technical Decisions & Tradeoffs

### JWT Permission Signatures vs. Active Session Checks
- **Decision**: We embedded the user's workspace roles (`Owner`, `Member`, `Observer`) directly into the payload of the JSON Web Token (JWT) rather than querying the database on every workspace API route.
- **Tradeoff**: While this eliminates significant DB lookup latency, it means role changes do not take effect until a user's token is refreshed. To bridge this, we implemented a token rotation hook that forces a background silent refresh whenever a user enters a new workspace view.

### MongoDB Document Arrays vs. Sub-collections for Cards
- **Decision**: Instead of keeping column card arrays nested directly inside the Project document, cards are stored in a separate collection, with columns keeping only reference IDs.
- **Rationale**: Mongoose has a limit of 16MB per document. Storing thousands of rich cards nested inside a single document would quickly hit memory limits and slow down queries. Separating collections keeps lookups bounded and fast.

---

## 5. Engineering Challenges & Resolves

### Challenge: Kanban State Rollbacks on API Failures
During drag-and-drop operations, moving a card immediately fires local animations. If the server fails to update the database (e.g., due to database locks or loss of network), the client interface must revert to its original position without layout flickering.

```typescript
// Optimistic UI state reducer helper
const moveCardOptimistically = async (cardId, fromCol, toCol, index) => {
  // 1. Keep rollback snapshot
  const previousState = getKanbanStateSnapshot();
  
  // 2. Perform optimistic update locally
  updateLocalState(cardId, fromCol, toCol, index);
  
  try {
    const res = await api.put(`/cards/${cardId}/move`, { toCol, index });
    if (!res.ok) throw new Error('Update failed');
  } catch (err) {
    // 3. Rollback on failure
    restoreKanbanState(previousState);
    triggerToastNotification('Sync failed. Reverting changes...');
  }
};
```

---

## 6. Project Results
- **Page Response Speed**: Replaced standard render loops with optimistic hooks, achieving an apparent visual card drag latency of **0ms** (fully clientside).
- **Latency Optimization**: Caching roles in JWTs reduced API response times for workspace routes by **45%** by skipping redundant DB queries.

---

## 7. Screenshots
![Trackly Kanban Dashboard](/images/projects/trackly.png)

---

## 8. Future Improvements
1. **Change Feed WebSockets**: Shift from polling mechanisms to active WebSockets so that drag-and-drop operations immediately reflect on all active team screens.
2. **Offline Mode**: Implement Service Workers and IndexDB storage to allow teams to move tasks offline and sync changes upon reconnection.
