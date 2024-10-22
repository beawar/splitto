import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/app.dart';

void main() {
  group('MyApp', () {
    testWidgets('should render a list of groups', (WidgetTester tester) async {
      await tester.pumpWidget(MyApp());
      expect(find.text('group 1'), findsOne);
      expect(find.text('group 2'), findsOne);
    });
  });
}
