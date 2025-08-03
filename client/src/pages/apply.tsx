import { Card, CardContent } from "@/components/ui/card";

export default function Apply() {
  return (
    <section className="py-20 bg-gradient-to-br from-columbia-blue to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Apply to Join
          </h1>
          <p className="text-xl text-gray-700">
            Take our 2-minute survey to see if you're a fit for Columbia Founder Community.
          </p>
        </div>
        
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Typeform Embed Placeholder */}
            <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-4xl text-gray-400 mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Typeform Application</h3>
              <p className="text-gray-500 mb-4">Interactive application form will be embedded here</p>
              <div className="bg-gray-100 rounded p-4 text-sm text-gray-600">
                <strong>Implementation:</strong><br />
                <code className="text-xs">
                  {`<iframe src="https://form.typeform.com/to/[FORM-ID]" width="100%" height="600" frameborder="0"></iframe>`}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
