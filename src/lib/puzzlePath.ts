/**
 * Jigsaw path geometry.
 *
 * Builds the outline of a single puzzle piece as an SVG path. The same
 * generator is used twice: once in objectBoundingBox space (0..1) to clip a
 * DOM node, and once in container space to stroke the empty-slot outlines.
 */

/** 1 = knob pushes outward, -1 = socket cuts inward, 0 = flat border edge. */
export type EdgeKind = 1 | -1 | 0;

export interface PieceEdges {
    top: EdgeKind;
    right: EdgeKind;
    bottom: EdgeKind;
    left: EdgeKind;
}

export interface Rect {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}

type Point = [number, number];

/**
 * The knob profile, expressed as (t, n): t runs 0..1 along the edge, n is the
 * outward offset where 1 is the full tab depth. Straight from 0 to NECK_IN,
 * then out through the pinched neck, over the head, and back down.
 */
const NECK_IN = 0.38;
const KNOB: Array<[Point, Point, Point]> = [
    [[0.42, 0.0], [0.3, 0.55], [0.36, 0.75]],
    [[0.42, 1.05], [0.58, 1.05], [0.64, 0.75]],
    [[0.7, 0.55], [0.58, 0.0], [0.62, 0.0]],
];

const round = (n: number) => Math.round(n * 10000) / 10000;

interface EdgeFrame {
    /** Edge start, in target space. */
    origin: Point;
    /** Vector from edge start to edge end. */
    along: Point;
    /** Outward normal, already scaled to the tab depth for this axis. */
    normal: Point;
}

const project = (frame: EdgeFrame, t: number, n: number): Point => [
    frame.origin[0] + frame.along[0] * t + frame.normal[0] * n,
    frame.origin[1] + frame.along[1] * t + frame.normal[1] * n,
];

const traceEdge = (frame: EdgeFrame, kind: EdgeKind): string => {
    const end = project(frame, 1, 0);

    if (kind === 0) {
        return `L${round(end[0])},${round(end[1])}`;
    }

    const sign = kind;
    const segments: string[] = [];
    const neck = project(frame, NECK_IN, 0);
    segments.push(`L${round(neck[0])},${round(neck[1])}`);

    for (const [c1, c2, to] of KNOB) {
        const p1 = project(frame, c1[0], c1[1] * sign);
        const p2 = project(frame, c2[0], c2[1] * sign);
        const p3 = project(frame, to[0], to[1] * sign);
        segments.push(
            `C${round(p1[0])},${round(p1[1])} ${round(p2[0])},${round(p2[1])} ${round(p3[0])},${round(p3[1])}`
        );
    }

    // KNOB lands back on the edge at NECK_OUT; run flat from there to the end.
    segments.push(`L${round(end[0])},${round(end[1])}`);
    return segments.join(" ");
};

/**
 * Outline of one piece. `tabX` / `tabY` are the knob depths measured in the
 * same units as `rect`. They differ per axis because the target space is
 * normalised independently on x and y.
 */
export function buildPiecePath(
    rect: Rect,
    tabX: number,
    tabY: number,
    edges: PieceEdges
): string {
    const w = rect.x1 - rect.x0;
    const h = rect.y1 - rect.y0;

    // Clockwise from the top-left corner.
    const frames: Array<[EdgeFrame, EdgeKind]> = [
        [{ origin: [rect.x0, rect.y0], along: [w, 0], normal: [0, -tabY] }, edges.top],
        [{ origin: [rect.x1, rect.y0], along: [0, h], normal: [tabX, 0] }, edges.right],
        [{ origin: [rect.x1, rect.y1], along: [-w, 0], normal: [0, tabY] }, edges.bottom],
        [{ origin: [rect.x0, rect.y1], along: [0, -h], normal: [-tabX, 0] }, edges.left],
    ];

    const parts = [`M${round(rect.x0)},${round(rect.y0)}`];
    for (const [frame, kind] of frames) {
        parts.push(traceEdge(frame, kind));
    }
    parts.push("Z");
    return parts.join(" ");
}

/**
 * Edge kinds for every piece of a cols x rows grid. Seams alternate so each
 * knob always meets a matching socket, and the outer border stays flat.
 */
export function buildGridEdges(cols: number, rows: number): PieceEdges[] {
    // A seam's orientation is fixed by its own coordinates, so the two pieces
    // sharing it always derive the same answer and interlock.
    const verticalSeam = (col: number, row: number): EdgeKind =>
        (col + row) % 2 === 0 ? 1 : -1;
    const horizontalSeam = (col: number, row: number): EdgeKind =>
        (col + row) % 2 === 0 ? -1 : 1;

    const edges: PieceEdges[] = [];
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            edges.push({
                top: row === 0 ? 0 : (-horizontalSeam(col, row - 1) as EdgeKind),
                right: col === cols - 1 ? 0 : verticalSeam(col, row),
                bottom: row === rows - 1 ? 0 : horizontalSeam(col, row),
                left: col === 0 ? 0 : (-verticalSeam(col - 1, row) as EdgeKind),
            });
        }
    }
    return edges;
}
